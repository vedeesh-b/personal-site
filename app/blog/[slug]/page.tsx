import { getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx-components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main>
      <article>
        <div className="py-30 w-full flex justify-center">
          <div className="flex flex-col items-center gap-8 text-start max-w-3xl w-full justify-center">
            <header className="w-full">
              <h1 className="text-2xl pb-2 font-medium w-full text-start">
                {frontmatter.title}
              </h1>
              <p className="text-muted-foreground">{frontmatter.description}</p>
              <time className="text-sm text-muted-foreground/70">
                {frontmatter.pubDate}
              </time>

              {frontmatter.heroImage && (
                <div className="mt-6 w-full">
                  {frontmatter.heroImagePrompt ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative cursor-pointer group">
                            <img
                              src={frontmatter.heroImage}
                              alt={frontmatter.title}
                              className="w-full h-auto rounded-lg"
                            />
                            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                              Prompt
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="max-w-sm text-xs leading-relaxed"
                        >
                          {frontmatter.heroImagePrompt}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <img
                      src={frontmatter.heroImage}
                      alt={frontmatter.title}
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              )}
            </header>

            <div className="w-full">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
