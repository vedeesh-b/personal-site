import { TravelAccordion } from "@/components/custom/TravelAccordion";

export default function About() {
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <div>
        <h1 className="text-2xl pb-2 font-medium">About</h1>
        <p>
          I’m a software engineer and designer based in London, UK. I’ve been
          here five years now, of which the last two have been spent building
          products for @bp.
        </p>
      </div>
      <div>
        <div className="border-[0.33px] rounded-4xl p-2 h-80 w-80" />
      </div>
      <div>
        <h2 className="text-xl pb-2 font-medium">Work</h2>
        <p className="pb-4">
          I enjoy tinkering with a variety of frameworks and tools, some of
          which include React, TypeScript, Tailwind, and Next.
        </p>
        <p>
          Figma is my design tool of choice, and I’m currently exploring its new
          place in the age of AI-assisted development.
        </p>
      </div>
      <div>
        <div className="border-[0.33px] rounded-4xl p-2 h-80 w-80" />
        <div className="border-[0.33px] rounded-4xl p-2 h-80 w-80" />
      </div>
      <div>
        <p className="pb-4">
          I have been really interested in the ways people have been using AI
          tools - but for me, the gritty problems are best solved with a
          notebook and pen. I’ve spent many hours by the canal at my local park
          in East London penning down drafts of what I’m working on.
        </p>
        <p>
          Outside of work, I find joy in photography, sport, and Legos. I’ve
          also recently taken up archery, and have been learning Japanese on
          Duolingo for over a year.
        </p>
      </div>
      <div className="w-full">
        <h2 className="text-xl pb-2 font-medium">Travel</h2>
        <TravelAccordion />
      </div>
      <div>
        <h2 className="text-xl pb-2 font-medium">Prized Possessions</h2>
        <p>Some of my favourite things that add value to my life every day.</p>
        <div className="border-[0.33px] rounded-2xl p-2 w-full aspect-square"></div>
        <div className="border-[0.33px] rounded-2xl p-2 w-full aspect-square"></div>
      </div>
    </div>
  );
}
