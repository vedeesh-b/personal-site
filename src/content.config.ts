import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each file in src/content/projects/ becomes /projects/{filename}.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			/** Position in the feed, lowest first. */
			order: z.number(),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			/** A muted loop that plays over the cover on hover: a cover.mp4 under src/assets/projects, relative to this file like `cover`. */
			coverVideo: z.string().optional(),
			/** The sharper, larger encode that autoplays over the cover on the project page: a video.mp4 next to the cover.mp4. */
			video: z.string().optional(),
			/** Shown as badges above the summary; the first one is highlighted. */
			tags: z.array(z.string()).optional(),
			/** The horizontally scrolling cards under the cover image. */
			summary: z
				.object({
					intro: z.string(),
					context: z.string(),
					problem: z.string(),
				})
				.optional(),
		}),
});

export const collections = { projects };
