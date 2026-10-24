// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import vercel from '@astrojs/vercel';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	adapter: vercel(),
	integrations: [mdx()],
	// Start loading a page when its link is hovered, so the click usually
	// lands on a page that's already here.
	prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
	// Served from the installed Fontsource packages (no CDN). Astro preloads
	// them and builds a fallback with Geist's metrics, so text doesn't jump
	// if a page paints before the font is ready.
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Geist Sans',
			cssVariable: '--font-geist-sans',
			fallbacks: ['sans-serif'],
			options: {
				variants: [400, 500].map((weight) => ({
					weight,
					style: 'normal',
					src: [`@fontsource/geist-sans/files/geist-sans-latin-${weight}-normal.woff2`],
				})),
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist Mono',
			cssVariable: '--font-geist-mono',
			fallbacks: ['monospace'],
			options: {
				variants: [400, 500].map((weight) => ({
					weight,
					style: 'normal',
					src: [`@fontsource/geist-mono/files/geist-mono-latin-${weight}-normal.woff2`],
				})),
			},
		},
	],
	env: {
		schema: {
			// Neon Postgres, for the guestbook.
			DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
		},
	},
});
