// Frontmatter can't import, so project videos are matched by path to Vite's hashed asset URLs.
// Only the web encodes (cover.mp4, video.mp4): every match ships in the build, and the full-length
// brag.mp4 originals are large.
const videoUrls = import.meta.glob<string>('/src/assets/projects/**/{cover,video}.mp4', {
	query: '?url',
	import: 'default',
	eager: true,
});

/** Resolves a frontmatter video path, relative to src/content/projects like `cover`, to its built URL. */
export function videoUrl(relativePath?: string) {
	if (!relativePath) return undefined;
	const url = videoUrls[new URL(relativePath, 'file:///src/content/projects/').pathname];
	if (!url) throw new Error(`Project videos must be a cover.mp4 or video.mp4 under src/assets/projects: ${relativePath}`);
	return url;
}
