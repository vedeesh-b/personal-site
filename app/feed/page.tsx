import { FeedCard } from "@/components/custom/FeedCard";
import Link from "next/link";

import tetrisImg from "@/assets/outernet-tetris.jpeg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";
import Image from "next/image";

export default function Feed() {
  const posts = getAllPosts();

  return (
    <div className="py-30 w-full flex justify-center">
      <div className=" flex flex-col items-center gap-8 text-start max-w-3xl justify-center">
        <div>
          <h1 className="text-2xl pb-2 font-medium w-full text-start">Feed</h1>
          <p className="pb-4">
            <Link
              href={"https://nownownow.com/about"}
              target="_blank"
              className="font-mono font-medium text-blue-600 underline underline-offset-[3.5px]"
            >
              /now
            </Link>{" "}
            pages essentially contain what you'd tell an old friend if they
            asked what you've been up to lately.
          </p>
          <p>
            I chose to build this page in the form of a visual feed that
            includes what I'm working on, interesting things I come across, and
            some of my side quests.
          </p>
        </div>
        <div className="pt-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="w-full flex sm:flex-col md:flex-row overflow-hidden p-0 hover:shadow-lg transition-shadow">
                <div className="relative sm:w-full h-40 md:h-auto md:w-50 shrink-0">
                  <Image
                    src={post.frontmatter.heroImage}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col pt-2 pb-6 md:py-6">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">
                      {post.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500">
                    {post.frontmatter.description}
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
