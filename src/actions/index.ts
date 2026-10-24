import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { addEntry, countRecent, isDuplicate } from '../lib/guestbook';

// Keep in step with the maxlength attributes in NoteForm.astro. A message
// longer than this no longer fits on the note.
export const LIMITS = { message: 200, name: 60, social: 200 };

// Faster than a person can write a note: almost certainly a bot.
const MIN_FILL_MS = 3000;
// Across everyone, so a flood can't bury the board. There's no per-visitor
// limit: that would need somewhere to keep IPs.
const MAX_NOTES = 5;
const WINDOW_MINUTES = 10;

export const server = {
	signGuestbook: defineAction({
		accept: 'form',
		input: z.object({
			// An empty field arrives as null, so the type error needs the same
			// message as the length check.
			message: z
				.string({ error: 'Write a message first.' })
				.trim()
				.min(1, 'Write a message first.')
				.max(LIMITS.message),
			name: z
				.string({ error: 'Add your name.' })
				.trim()
				.min(1, 'Add your name.')
				.max(LIMITS.name),
			social: z.string().trim().max(LIMITS.social).optional(),
			// Hidden from people. Bots fill in every field they find.
			website: z.string().optional(),
			// When the form was rendered, in ms since the epoch.
			started: z.coerce.number().optional(),
		}),
		handler: async ({ website, started, ...entry }) => {
			// Look like it worked, so bots don't learn to adapt.
			const tooFast = !started || Date.now() - started < MIN_FILL_MS;
			if (website || tooFast) return;

			if (await isDuplicate(entry.name, entry.message)) {
				throw new ActionError({
					code: 'CONFLICT',
					message: 'You already left this note today.',
				});
			}
			if ((await countRecent(WINDOW_MINUTES)) >= MAX_NOTES) {
				throw new ActionError({
					code: 'TOO_MANY_REQUESTS',
					message: 'Lots of notes just now. Try again in a few minutes?',
				});
			}
			await addEntry(entry);
		},
	}),
};
