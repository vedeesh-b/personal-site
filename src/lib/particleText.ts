// Turns a heading into particles on hover: they scatter (most near the
// pointer) while it's over the text, and spring back home when it leaves.
//
// The real text stays in the page for wrapping, selection and screen
// readers. A canvas over it draws the same words as particles, and only
// while the effect runs: at rest the canvas is hidden and the text shows.
// Every device pixel of the text is a particle that keeps its own
// anti-aliased opacity, so at home the canvas is the text, pixel for pixel,
// and the swap between them can't be seen.

/** Room around the heading for particles to scatter into, in CSS px. */
const PAD = 80;
/** Pixels fainter than this (out of 255) are left out. */
const MIN_ALPHA = 8;
/** How far particles scatter right by the pointer, and from FALLOFF px away
 *  on. Small next to the ~19px letters, so the text stays faintly
 *  readable. */
const NEAR_SCATTER = 26;
const FAR_SCATTER = 1.5;
const FALLOFF = 180;
/** Particles within this distance of a moving pointer get pushed away. */
const REPEL_RADIUS = 60;
const REPEL_FORCE = 900;
/** Restless drift while scattered, in px/s². */
const JITTER = 120;
/** Springs: loose while scattered, tighter (with a little overshoot) home. */
const SCATTER_SPRING = { stiffness: 40, damping: 9 };
const HOME_SPRING = { stiffness: 120, damping: 14 };
/** Particles start heading home at slightly different times. */
const MAX_RETURN_DELAY = 0.08;
/** Below this, in px and px/s, a particle counts as home. Under half a
 *  device pixel even at 3×, so it rounds to exactly where the text is. */
const SETTLED = 0.15;

const supported = () =>
	'letterSpacing' in CanvasRenderingContext2D.prototype &&
	matchMedia('(hover: hover) and (pointer: fine)').matches &&
	!matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * `heading` must wrap each word in a `.word` span, so the words can be
 * found wherever the text wraps.
 */
export function particleText(heading: HTMLElement) {
	if (!supported()) return;

	const canvas = document.createElement('canvas');
	canvas.setAttribute('aria-hidden', 'true');
	Object.assign(canvas.style, {
		position: 'absolute',
		inset: `-${PAD}px`,
		width: `calc(100% + ${PAD * 2}px)`,
		height: `calc(100% + ${PAD * 2}px)`,
		pointerEvents: 'none',
		visibility: 'hidden',
	});
	heading.style.position = 'relative';
	heading.append(canvas);
	const ctx = canvas.getContext('2d')!;

	let count = 0;
	let homeX = new Float32Array(0);
	let homeY = new Float32Array(0);
	let x = new Float32Array(0);
	let y = new Float32Array(0);
	let vx = new Float32Array(0);
	let vy = new Float32Array(0);
	let targetX = new Float32Array(0);
	let targetY = new Float32Array(0);
	let returnDelay = new Float32Array(0);
	let alpha = new Uint8Array(0);
	let rgb = [17, 17, 17];
	let frameBuffer = new ImageData(1, 1);
	let dpr = 1;
	let stale = true;

	// Draw each word where the page put it, then keep one particle per
	// device pixel that has ink in it.
	const sample = () => {
		const style = getComputedStyle(heading);
		rgb = style.color.match(/[\d.]+/g)!.slice(0, 3).map(Number);
		dpr = window.devicePixelRatio || 1;
		const box = heading.getBoundingClientRect();
		const width = box.width + PAD * 2;
		const height = box.height + PAD * 2;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);

		const off = document.createElement('canvas');
		off.width = canvas.width;
		off.height = canvas.height;
		const o = off.getContext('2d', { willReadFrequently: true })!;
		o.scale(dpr, dpr);
		o.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
		o.fontStretch = style.fontStretch as CanvasFontStretch;
		o.fontKerning = style.fontKerning as CanvasFontKerning;
		o.letterSpacing = style.letterSpacing;
		o.fillStyle = '#000';
		o.textBaseline = 'alphabetic';
		for (const word of heading.querySelectorAll<HTMLElement>('.word')) {
			const rect = word.getBoundingClientRect();
			const text = word.textContent ?? '';
			// An inline box is as tall as the font's ascent plus descent, so
			// the baseline is one ascent down from its top.
			const ascent = o.measureText(text).fontBoundingBoxAscent;
			o.fillText(
				text,
				rect.left - box.left + PAD,
				rect.top - box.top + PAD + ascent,
			);
		}

		const { data } = o.getImageData(0, 0, off.width, off.height);
		const xs: number[] = [];
		const ys: number[] = [];
		const as: number[] = [];
		for (let py = 0; py < off.height; py++) {
			for (let px = 0; px < off.width; px++) {
				const a = data[(py * off.width + px) * 4 + 3];
				if (a < MIN_ALPHA) continue;
				// Positions are in CSS px, like the pointer and the physics.
				xs.push(px / dpr);
				ys.push(py / dpr);
				as.push(a);
			}
		}

		count = xs.length;
		alpha = Uint8Array.from(as);
		frameBuffer = new ImageData(off.width, off.height);
		homeX = Float32Array.from(xs);
		homeY = Float32Array.from(ys);
		x = homeX.slice();
		y = homeY.slice();
		vx = new Float32Array(count);
		vy = new Float32Array(count);
		targetX = homeX.slice();
		targetY = homeY.slice();
		returnDelay = new Float32Array(count);
		stale = false;
	};

	// Each particle is one device pixel, written straight into the frame.
	// Where two land on the same pixel, the more opaque one wins.
	const render = () => {
		const { data, width, height } = frameBuffer;
		data.fill(0);
		const [r, g, b] = rgb;
		for (let i = 0; i < count; i++) {
			const px = Math.round(x[i] * dpr);
			const py = Math.round(y[i] * dpr);
			if (px < 0 || py < 0 || px >= width || py >= height) continue;
			const at = (py * width + px) * 4;
			if (data[at + 3] >= alpha[i]) continue;
			data[at] = r;
			data[at + 1] = g;
			data[at + 2] = b;
			data[at + 3] = alpha[i];
		}
		ctx.putImageData(frameBuffer, 0, 0);
	};

	const show = (on: boolean) => {
		canvas.style.visibility = on ? 'visible' : 'hidden';
		heading.style.color = on ? 'transparent' : '';
	};

	let hovering = false;
	let pointer = { x: 0, y: 0 };
	let frame = 0;
	let last = 0;
	// Seconds since the pointer left, for the staggered return.
	let sinceLeave = 0;

	// Pointer position in the canvas's coordinates.
	const toCanvas = (event: PointerEvent) => {
		const box = heading.getBoundingClientRect();
		return {
			x: event.clientX - box.left + PAD,
			y: event.clientY - box.top + PAD,
		};
	};

	const scatter = () => {
		for (let i = 0; i < count; i++) {
			const distance = Math.hypot(homeX[i] - pointer.x, homeY[i] - pointer.y);
			const t = Math.min(distance / FALLOFF, 1);
			const radius = NEAR_SCATTER + (FAR_SCATTER - NEAR_SCATTER) * t;
			const angle = Math.random() * Math.PI * 2;
			// sqrt spreads them evenly over the disc rather than bunching at
			// its centre.
			const reach = radius * Math.sqrt(Math.random());
			targetX[i] = homeX[i] + Math.cos(angle) * reach;
			targetY[i] = homeY[i] + Math.sin(angle) * reach;
		}
	};

	const tick = (time: number) => {
		// Capped so a dropped frame doesn't fling everything.
		const dt = last ? Math.min((time - last) / 1000, 1 / 30) : 1 / 60;
		last = time;
		if (!hovering) sinceLeave += dt;

		const { stiffness, damping } = hovering ? SCATTER_SPRING : HOME_SPRING;
		let moving = false;
		for (let i = 0; i < count; i++) {
			const goingHome = !hovering && sinceLeave >= returnDelay[i];
			const tx = goingHome ? homeX[i] : targetX[i];
			const ty = goingHome ? homeY[i] : targetY[i];
			let ax = stiffness * (tx - x[i]) - damping * vx[i];
			let ay = stiffness * (ty - y[i]) - damping * vy[i];
			if (hovering) {
				ax += (Math.random() - 0.5) * JITTER;
				ay += (Math.random() - 0.5) * JITTER;
			}
			vx[i] += ax * dt;
			vy[i] += ay * dt;
			x[i] += vx[i] * dt;
			y[i] += vy[i] * dt;
			if (
				hovering ||
				Math.abs(homeX[i] - x[i]) > SETTLED ||
				Math.abs(homeY[i] - y[i]) > SETTLED ||
				Math.abs(vx[i]) > SETTLED ||
				Math.abs(vy[i]) > SETTLED
			) {
				moving = true;
			}
		}

		if (moving) {
			render();
			frame = requestAnimationFrame(tick);
		} else {
			// Home: hand back to the real text and stop until the next hover.
			x = homeX.slice();
			y = homeY.slice();
			frame = 0;
			show(false);
		}
	};

	const run = () => {
		if (frame) return;
		last = 0;
		frame = requestAnimationFrame(tick);
	};

	heading.addEventListener('pointerenter', (event) => {
		if (event.pointerType !== 'mouse') return;
		if (stale) sample();
		hovering = true;
		pointer = toCanvas(event);
		scatter();
		// Swap to the canvas in the same frame as the text hides, so nothing
		// flickers.
		render();
		show(true);
		run();
	});

	heading.addEventListener('pointermove', (event) => {
		if (!hovering) return;
		pointer = toCanvas(event);
		// A short shove away from the pointer, strongest right by it.
		const dt = 1 / 60;
		for (let i = 0; i < count; i++) {
			const dx = x[i] - pointer.x;
			const dy = y[i] - pointer.y;
			const distance = Math.hypot(dx, dy);
			if (distance > REPEL_RADIUS || distance === 0) continue;
			const push = (REPEL_FORCE * (1 - distance / REPEL_RADIUS)) / distance;
			vx[i] += dx * push * dt;
			vy[i] += dy * push * dt;
		}
	});

	heading.addEventListener('pointerleave', () => {
		if (!hovering) return;
		hovering = false;
		sinceLeave = 0;
		for (let i = 0; i < count; i++) {
			returnDelay[i] = Math.random() * MAX_RETURN_DELAY;
		}
		run();
	});

	// Re-sample after the text reflows (and once the web font has loaded).
	// Sampling takes ~100ms, so do it while the page is idle rather than on
	// the first hover. Mid-effect, leave the particles alone; the next hover
	// picks it up.
	let idle = 0;
	const markStale = () => {
		stale = true;
		if (idle) return;
		idle = (window.requestIdleCallback ?? setTimeout)(() => {
			idle = 0;
			if (stale && !frame) sample();
		});
	};
	new ResizeObserver(markStale).observe(heading);
	document.fonts.ready.then(markStale);
}
