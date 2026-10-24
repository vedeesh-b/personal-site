import colourUrl from '../../assets/halftone/colour.png?url';
import fieldUrl from '../../assets/halftone/field.png?url';
import meta from '../../assets/halftone/meta.json';
import paintingUrl from '../../assets/halftone/painting.webp?url';
import { fragment, vertex } from './shader';
import { Spring } from './spring';

export interface HalftonePortrait {
	/** Grow the marks in from nothing. Resolves when they've settled. */
	develop(duration: number): Promise<void>;
	destroy(): void;
}

interface Options {
	/** Start with no marks drawn, ready for develop(). */
	intro?: boolean;
	/** Follow the pointer with a lens that shows the painting. */
	interactive?: boolean;
}

// The lens's radius as a share of the portrait's width.
const LENS_RADIUS = 0.3;
// Above this, more pixels cost more than they add.
const MAX_DPR = 2;

async function loadBitmap(url: string) {
	const blob = await (await fetch(url)).blob();
	// The data textures hold numbers, not colours: decode them untouched.
	return createImageBitmap(blob, {
		premultiplyAlpha: 'none',
		colorSpaceConversion: 'none',
	});
}

function texture(
	gl: WebGL2RenderingContext,
	unit: number,
	image: ImageBitmap,
	filter: number,
) {
	gl.activeTexture(gl.TEXTURE0 + unit);
	gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

function program(gl: WebGL2RenderingContext) {
	const prog = gl.createProgram();
	for (const [type, source] of [
		[gl.VERTEX_SHADER, vertex],
		[gl.FRAGMENT_SHADER, fragment],
	] as const) {
		const shader = gl.createShader(type)!;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		gl.attachShader(prog, shader);
	}
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(prog));
		return null;
	}
	return prog;
}

/**
 * Draws the halftone with WebGL over the poster image in `root`, and hides
 * the poster once the first frame is up. Returns null if WebGL isn't
 * available, in which case the poster stays.
 */
export async function mountHalftone(
	root: HTMLElement,
	{ intro = false, interactive = false }: Options = {},
): Promise<HalftonePortrait | null> {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl2', { antialias: false });
	if (!gl) return null;
	const prog = program(gl);
	if (!prog) return null;

	let images: ImageBitmap[];
	try {
		images = await Promise.all(
			[colourUrl, fieldUrl, paintingUrl].map(loadBitmap),
		);
	} catch {
		return null;
	}

	gl.useProgram(prog);
	texture(gl, 0, images[0], gl.NEAREST);
	texture(gl, 1, images[1], gl.NEAREST);
	texture(gl, 2, images[2], gl.LINEAR);
	images.forEach((image) => image.close());

	const u = (name: string) => gl.getUniformLocation(prog, name);
	gl.uniform1i(u('uColour'), 0);
	gl.uniform1i(u('uField'), 1);
	gl.uniform1i(u('uPainting'), 2);
	gl.uniform2i(u('uGrid'), meta.cols, meta.rows);
	gl.uniform1f(u('uMaxHalfLength'), meta.maxHalfLength);
	gl.uniform1f(u('uMaxRadius'), meta.maxRadius);
	const uSize = u('uSize');
	const uDpr = u('uDpr');
	const uIntro = u('uIntro');
	const uLens = u('uLens');
	const uLensAmount = u('uLensAmount');

	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	// The lens opens with a little overshoot, and closes the same way. With
	// reduced motion it's critically damped: no bounce.
	const lensAmount = new Spring(0, 180, reduceMotion ? 27 : 13);
	const lensX = new Spring(0, 500, 45);
	const lensY = new Spring(0, 500, 45);
	let introProgress = intro ? 0 : 1;
	let introTween: { start: number; duration: number; done: () => void } | null =
		null;

	let width = 0;
	let height = 0;
	let frame = 0;
	let last = 0;

	function draw(now: number) {
		frame = 0;
		const dt = Math.min(0.05, (now - (last || now)) / 1000);
		last = now;

		let moving = false;
		if (introTween) {
			introProgress = Math.min(
				1,
				(now - introTween.start) / introTween.duration,
			);
			if (introProgress >= 1) {
				introTween.done();
				introTween = null;
			} else {
				moving = true;
			}
		}
		for (const spring of [lensAmount, lensX, lensY]) {
			spring.step(dt);
			if (!spring.settled) moving = true;
		}

		gl!.viewport(0, 0, canvas.width, canvas.height);
		gl!.uniform2f(uSize, width, height);
		gl!.uniform1f(uDpr, canvas.width / width);
		gl!.uniform1f(uIntro, introProgress);
		// Overshoot makes the lens briefly larger; undershoot never inverts it.
		const amount = Math.max(0, lensAmount.value);
		gl!.uniform3f(
			uLens,
			lensX.value,
			lensY.value,
			width * LENS_RADIUS * amount,
		);
		gl!.uniform1f(uLensAmount, Math.min(1, amount));
		gl!.drawArrays(gl!.TRIANGLES, 0, 3);

		if (moving) request();
		else last = 0;
	}

	function request() {
		if (!frame) frame = requestAnimationFrame(draw);
	}

	function resize() {
		// Layout size, ignoring any hover scale.
		width = root.offsetWidth;
		height = root.offsetHeight;
		const dpr = Math.min(devicePixelRatio, MAX_DPR);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		request();
	}

	const observer = new ResizeObserver(resize);
	observer.observe(root);
	resize();
	draw(performance.now());
	root.append(canvas);
	root.dataset.ready = '';

	const controller = new AbortController();
	if (interactive) {
		const { signal } = controller;
		const move = (event: PointerEvent) => {
			// The portrait may be scaled on hover; map back to unscaled pixels.
			const rect = root.getBoundingClientRect();
			const x = ((event.clientX - rect.left) * width) / rect.width;
			const y = ((event.clientY - rect.top) * height) / rect.height;
			// While closed, jump to the pointer rather than sliding in from
			// wherever the lens was last.
			if (lensAmount.value < 0.05) {
				lensX.value = x;
				lensY.value = y;
			}
			lensX.target = x;
			lensY.target = y;
			lensAmount.target = 1;
			request();
		};
		const leave = () => {
			lensAmount.target = 0;
			request();
		};
		root.addEventListener('pointerenter', move, { signal });
		root.addEventListener('pointerdown', move, { signal });
		root.addEventListener('pointermove', move, { signal });
		root.addEventListener('pointerleave', leave, { signal });
		root.addEventListener('pointercancel', leave, { signal });
		root.addEventListener(
			'pointerup',
			(event) => {
				if (event.pointerType === 'touch') leave();
			},
			{ signal },
		);
	}

	return {
		develop(duration) {
			return new Promise((done) => {
				introProgress = 0;
				introTween = { start: performance.now(), duration, done };
				request();
			});
		},
		destroy() {
			cancelAnimationFrame(frame);
			observer.disconnect();
			controller.abort();
			gl.getExtension('WEBGL_lose_context')?.loseContext();
			canvas.remove();
		},
	};
}
