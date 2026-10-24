// Turns the painted portrait into the halftone's source files.
// Usage: node scripts/halftone-portrait/build.mjs [painting]
//
// The halftone is a grid of cells. Each cell holds one mark: a rounded dash
// of the same length everywhere, laid along the brushstroke under it,
// coloured from the painting and thicker where the painting is darker. The
// dashes are wide enough to nearly touch, so the portrait reads as a solid
// image made of strokes rather than marks on white.
//
// Writes to src/assets/halftone/:
// - colour.png   one pixel per cell: the painting's colour.
// - field.png    one pixel per cell: R = angle, G = half-length, B = radius.
// - painting.webp the cropped painting, revealed under the lens.
// - poster-*.webp the resting halftone, shown before (or without) WebGL.
// - meta.json    grid size and the encoding ranges below.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const out = join(root, 'src/assets/halftone');
const source = process.argv[2] ?? join(out, 'source.png');

const COLS = 72;
// Pixels per cell when measuring brushstroke direction.
const SUB = 8;
// Cells either side to average stroke direction over.
const WINDOW = 2;
// In cell units. Marks may spill into neighbouring cells, but never more
// than one cell over: the shader only looks at the 3×3 cells around a pixel.
const MAX_HALF_LENGTH = 0.8;
const MAX_RADIUS = 0.5;
// A dash's radius in the lightest and darkest spots. Every dash is the
// longest allowed.
const MIN_RADIUS = 0.2;
const DARK_RADIUS = 0.42;
const POSTER_WIDTHS = [400, 640];

// Head and shoulders, leaving out the palette in the bottom left.
const CROP = { left: 0, top: 0, width: 786, height: 840 };
const ROWS = Math.round((COLS * CROP.height) / CROP.width);

const cropped = () => sharp(readFileSync(source)).extract(CROP).removeAlpha();

const colour = await cropped()
	.resize(COLS, ROWS, { fit: 'fill', kernel: 'cubic' })
	.raw()
	.toBuffer();

const gw = COLS * SUB;
const gh = ROWS * SUB;
const grey = await cropped()
	.resize(gw, gh, { fit: 'fill' })
	.greyscale()
	.blur(1.5)
	.raw()
	.toBuffer();

// Structure tensor: summed outer products of the image gradient. Its main
// axis points across the strokes, so the strokes run perpendicular to it.
const jxx = new Float64Array(COLS * ROWS);
const jxy = new Float64Array(COLS * ROWS);
const jyy = new Float64Array(COLS * ROWS);
const px = (x, y) =>
	grey[
		Math.min(gh - 1, Math.max(0, y)) * gw + Math.min(gw - 1, Math.max(0, x))
	];
for (let y = 0; y < gh; y++) {
	for (let x = 0; x < gw; x++) {
		const gx =
			px(x + 1, y - 1) +
			2 * px(x + 1, y) +
			px(x + 1, y + 1) -
			px(x - 1, y - 1) -
			2 * px(x - 1, y) -
			px(x - 1, y + 1);
		const gy =
			px(x - 1, y + 1) +
			2 * px(x, y + 1) +
			px(x + 1, y + 1) -
			px(x - 1, y - 1) -
			2 * px(x, y - 1) -
			px(x + 1, y - 1);
		const i = Math.floor(y / SUB) * COLS + Math.floor(x / SUB);
		jxx[i] += gx * gx;
		jxy[i] += gx * gy;
		jyy[i] += gy * gy;
	}
}

const smoothstep = (a, b, x) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
	return t * t * (3 - 2 * t);
};

const marks = [];
const field = Buffer.alloc(COLS * ROWS * 3);
for (let row = 0; row < ROWS; row++) {
	for (let col = 0; col < COLS; col++) {
		// Average the tensor over a few cells around this one, so dashes follow
		// the broad sweep of the strokes rather than single bristle marks.
		let xx = 0;
		let xy = 0;
		let yy = 0;
		for (let dy = -WINDOW; dy <= WINDOW; dy++) {
			for (let dx = -WINDOW; dx <= WINDOW; dx++) {
				const c = Math.min(COLS - 1, Math.max(0, col + dx));
				const r = Math.min(ROWS - 1, Math.max(0, row + dy));
				const j = r * COLS + c;
				const w = Math.exp(-(dx * dx + dy * dy) / (WINDOW * WINDOW));
				xx += jxx[j] * w;
				xy += jxy[j] * w;
				yy += jyy[j] * w;
			}
		}
		let angle = 0.5 * Math.atan2(2 * xy, xx - yy) + Math.PI / 2;
		angle = ((angle % Math.PI) + Math.PI) % Math.PI;

		const i = row * COLS + col;
		const [r, g, b] = colour.subarray(i * 3, i * 3 + 3);
		const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
		// Stretched so the narrow range of skin tones still separates the eyes,
		// brows and mouth from the cheeks.
		const dark = smoothstep(0.85, 0.15, lum);
		const halfLength = MAX_HALF_LENGTH;
		const radius = MIN_RADIUS + (DARK_RADIUS - MIN_RADIUS) * dark;

		// Quantise first, so the poster draws exactly what the shader decodes.
		const enc = [
			Math.round((angle / Math.PI) * 255) % 256,
			Math.round((halfLength / MAX_HALF_LENGTH) * 255),
			Math.round((radius / MAX_RADIUS) * 255),
		];
		field.set(enc, i * 3);
		marks.push({
			col,
			row,
			fill: `rgb(${r},${g},${b})`,
			angle: (enc[0] / 255) * Math.PI,
			halfLength: (enc[1] / 255) * MAX_HALF_LENGTH,
			radius: (enc[2] / 255) * MAX_RADIUS,
		});
	}
}

const raw = { raw: { width: COLS, height: ROWS, channels: 3 } };
await sharp(colour, raw).png().toFile(join(out, 'colour.png'));
await sharp(field, raw).png().toFile(join(out, 'field.png'));
await cropped()
	.resize(720)
	.webp({ quality: 82 })
	.toFile(join(out, 'painting.webp'));

// The poster is the same marks drawn as SVG lines with round caps, which is
// exactly the capsule the shader draws.
const lines = marks
	.map(({ col, row, fill, angle, halfLength, radius }) => {
		const cx = col + 0.5;
		const cy = row + 0.5;
		const dx = Math.cos(angle) * halfLength;
		const dy = Math.sin(angle) * halfLength;
		const f = (n) => +n.toFixed(3);
		return `<line x1="${f(cx - dx)}" y1="${f(cy - dy)}" x2="${f(cx + dx)}" y2="${f(cy + dy)}" stroke="${fill}" stroke-width="${f(radius * 2)}"/>`;
	})
	.join('');
for (const width of POSTER_WIDTHS) {
	const height = Math.round((width * ROWS) / COLS);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${COLS} ${ROWS}" stroke-linecap="round">${lines}</svg>`;
	await sharp(Buffer.from(svg))
		.webp({ quality: 75, alphaQuality: 80 })
		.toFile(join(out, `poster-${width}.webp`));
}

writeFileSync(
	join(out, 'meta.json'),
	JSON.stringify(
		{
			cols: COLS,
			rows: ROWS,
			maxHalfLength: MAX_HALF_LENGTH,
			maxRadius: MAX_RADIUS,
		},
		null,
		'\t',
	) + '\n',
);

console.log(`Wrote a ${COLS}×${ROWS} halftone to ${out}`);
