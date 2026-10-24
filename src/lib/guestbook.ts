import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from 'astro:env/server';

export interface GuestbookEntry {
	id: number;
	name: string;
	social: string | null;
	message: string;
	created_at: Date;
}

/** Notes per page. */
export const PAGE_SIZE = 12;

// Created on first use, so a missing DATABASE_URL fails the query (which the
// page catches) rather than the import.
let client: ReturnType<typeof neon> | undefined;
const sql = () => (client ??= neon(DATABASE_URL));

/** Newest first. Pass the last id you have to get the page after it. */
export async function getEntries(before?: number) {
	return (await sql().query(
		`SELECT id, name, social, message, created_at FROM guestbook
		 WHERE $1::int IS NULL OR id < $1
		 ORDER BY id DESC LIMIT $2`,
		[before ?? null, PAGE_SIZE + 1],
	)) as GuestbookEntry[];
}

export async function addEntry(entry: {
	name: string;
	social?: string;
	message: string;
}) {
	await sql().query(
		'INSERT INTO guestbook (name, social, message) VALUES ($1, $2, $3)',
		[entry.name, entry.social || null, entry.message],
	);
}

/** How many notes were left in the last `minutes`, by anyone. */
export async function countRecent(minutes: number) {
	const [row] = (await sql().query(
		`SELECT count(*)::int AS n FROM guestbook
		 WHERE created_at > now() - make_interval(mins => $1)`,
		[minutes],
	)) as { n: number }[];
	return row.n;
}

/** Whether this exact note was already left today. */
export async function isDuplicate(name: string, message: string) {
	const rows = await sql().query(
		`SELECT 1 FROM guestbook
		 WHERE lower(name) = lower($1) AND message = $2
		   AND created_at > now() - interval '1 day'
		 LIMIT 1`,
		[name, message],
	);
	return rows.length > 0;
}

/** A link for whatever the visitor typed as their social, or null. */
export function socialHref(social: string | null) {
	if (!social) return null;
	const href = /^https?:\/\//i.test(social) ? social : `https://${social}`;
	try {
		return new URL(href).href;
	} catch {
		return null;
	}
}
