import { FeedCard } from "@/components/custom/FeedCard";
import Link from "next/link";

import tetrisImg from "@/assets/outernet-tetris.jpeg";

export default function Feed() {
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
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
          pages essentially contain what you'd tell an old friend if they asked
          what you've been up to lately.
        </p>
        <p>
          I chose to build this page in the form of a visual feed that includes
          what I'm working on, interesting things I come across, and some of my
          side quests.
        </p>
      </div>
      <div>
        <FeedCard
          title="Tetris @ Outernet London"
          date={new Date("7 Mar 2026")}
          imgUrl={tetrisImg}
        />
      </div>
    </div>
  );
}
