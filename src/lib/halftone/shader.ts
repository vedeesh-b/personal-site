// Draws the halftone. Every pixel works out which grid cell it's in, then
// draws the marks of that cell and its eight neighbours (a mark can spill up
// to one cell over). Each mark is a capsule: a line segment with round ends,
// the same shape the build script draws for the poster.

export const vertex = `#version 300 es
void main() {
	// One triangle that covers the whole canvas.
	vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
	gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const fragment = `#version 300 es
precision highp float;

uniform sampler2D uColour;
uniform sampler2D uField;
uniform sampler2D uPainting;
// Canvas size in CSS pixels, and device pixels per CSS pixel.
uniform vec2 uSize;
uniform float uDpr;
uniform ivec2 uGrid;
uniform float uMaxHalfLength;
uniform float uMaxRadius;
// 0 → 1 while the marks grow in.
uniform float uIntro;
// Lens centre and radius in CSS pixels, and how far it has opened.
uniform vec3 uLens;
uniform float uLensAmount;

out vec4 outColour;

const float PI = 3.14159265;
// How much the lens magnifies at its centre when fully open.
const float ZOOM = 1.2;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float capsule(vec2 p, vec2 dir, float halfLength, float radius) {
	float t = clamp(dot(p, dir), -halfLength, halfLength);
	return length(p - dir * t) - radius;
}

void main() {
	// CSS pixels, y down, matching the grid's rows.
	vec2 p = vec2(gl_FragCoord.x, uSize.y * uDpr - gl_FragCoord.y) / uDpr;

	// Fisheye: inside the lens, pull samples towards the centre so the marks
	// under it look bigger. Falls smoothly to no change at the rim.
	vec2 fromLens = p - uLens.xy;
	float dist = length(fromLens);
	float falloff = uLens.z > 0.0 ? pow(max(0.0, 1.0 - dist / uLens.z), 2.0) : 0.0;
	float zoom = 1.0 + ZOOM * uLensAmount * falloff;
	vec2 q = uLens.xy + fromLens / zoom;

	float cell = uSize.x / float(uGrid.x);
	vec2 g = q / cell;
	ivec2 home = ivec2(floor(g));
	// Device pixels per cell unit at this spot, for anti-aliasing.
	float pxPerUnit = cell * uDpr * zoom;

	vec4 colour = vec4(0.0);
	for (int dy = -1; dy <= 1; dy++) {
		for (int dx = -1; dx <= 1; dx++) {
			ivec2 c = home + ivec2(dx, dy);
			if (c.x < 0 || c.y < 0 || c.x >= uGrid.x || c.y >= uGrid.y) continue;

			vec3 rgb = texelFetch(uColour, c, 0).rgb;
			vec3 field = texelFetch(uField, c, 0).rgb;
			float angle = field.r * PI;
			float halfLength = field.g * uMaxHalfLength;
			float radius = field.b * uMaxRadius;

			// Dark marks grow first, in a loose, noisy order.
			float lum = dot(rgb, vec3(0.2126, 0.7152, 0.0722));
			float delay = 0.6 * (0.6 * lum + 0.4 * hash(vec2(c)));
			float t = clamp((uIntro - delay) / 0.4, 0.0, 1.0);
			float grow = 1.0 - pow(1.0 - t, 3.0);

			vec2 dir = vec2(cos(angle), sin(angle));
			float d = capsule(g - (vec2(c) + 0.5), dir, halfLength * grow, radius * grow);
			float alpha = grow > 0.0 ? clamp(0.5 - d * pxPerUnit, 0.0, 1.0) : 0.0;
			// Premultiplied "over".
			colour = vec4(rgb * alpha, alpha) + colour * (1.0 - alpha);
		}
	}

	// The real painting shows through the middle of the lens.
	float reveal = uLensAmount * smoothstep(0.75, 0.35, dist / max(uLens.z, 1.0));
	if (reveal > 0.0) {
		vec3 painting = texture(uPainting, q / uSize).rgb;
		colour = mix(colour, vec4(painting, 1.0), clamp(reveal, 0.0, 1.0));
	}

	outColour = colour;
}`;
