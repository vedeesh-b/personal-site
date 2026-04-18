import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Point this to where Pages CMS saves your blog posts
const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPosts() {
  // Get all file names in the directory
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx")) // Support both .md and .mdx
    .map((fileName) => {
      // The slug is the file name without the extension
      const slug = fileName.replace(/\.mdx?$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Parse the frontmatter using gray-matter
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data,
      };
    })
    // Sort posts by publication date in descending order (newest first)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.pubDate).getTime();
      const dateB = new Date(b.frontmatter.pubDate).getTime();
      return dateB - dateA;
    });

  return allPosts;
}

export function getPostBySlug(slug: string) {
  try {
    // Try .mdx first, fall back to .md
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the frontmatter and the markdown body
    const { data, content } = matter(fileContents);

    return { frontmatter: data, content };
  } catch (error) {
    return null; // Return null if the file doesn't exist
  }
}
