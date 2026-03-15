import { TravelAccordion } from "@/components/custom/TravelAccordion";
import headerImage from "@/assets/portrait.jpg";
import Image from "next/image";
import { CardStack } from "@/components/ui/card-stack";
import { ArrowRight } from "lucide-react";

import backpackImg from "@/assets/possessions/backpack.jpg";
import cameraImg from "@/assets/possessions/camera.webp";
import garminImg from "@/assets/possessions/garmin.png";
import cricketImg from "@/assets/cricket.jpeg";
import duolingoImg from "@/assets/duolingo.png";
import photographyImg from "@/assets/photography.jpeg";
import legoImg from "@/assets/lego.jpg";

import Link from "next/link";
import { PossessionCard } from "@/components/custom/PossessionCard";

export default function About() {
  const hobbyImgs = [
    {
      id: 1,
      name: "Photography",
      imgUrl: photographyImg,
    },
    {
      id: 2,
      name: "Duolingo",
      imgUrl: duolingoImg,
    },
    {
      id: 3,
      name: "Cricket",
      imgUrl: cricketImg,
    },
    {
      id: 4,
      name: "Lego",
      imgUrl: legoImg,
    },
  ];

  return (
    <div className="py-30 w-full flex justify-center">
      <div className=" flex flex-col items-center gap-12 text-start max-w-3xl justify-center">
        <div>
          <h1 className="text-2xl pb-2 font-medium">About</h1>
          <p>
            I’m a software engineer and designer based in London, UK. I’ve been
            here five years now, of which the last two have been spent building
            products for{" "}
            <Link
              href={
                "https://www.bp.com/en/global/corporate/products-and-services.html"
              }
              target="_blank"
              className="font-mono font-medium text-blue-600 underline underline-offset-[3.5px]"
            >
              @bp
            </Link>
            .
          </p>
        </div>
        <div>
          <div className="relative border-[0.33px] rounded-4xl p-2 h-80 w-80">
            <Image
              src={headerImage}
              alt="Vedeesh Bali"
              className="relative p-2 rounded-[26px] object-cover"
              fill
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl pb-2 font-medium">Work</h2>
          <p className="pb-4">
            I enjoy tinkering with a variety of frameworks and tools, some of
            which include React, TypeScript, Tailwind, and Next.
          </p>
          <p className="pb-4">
            Figma is my design tool of choice, and I’m currently exploring its
            new place in the age of AI-assisted development.
          </p>
          <p>
            I have been really interested in the ways people have been using AI
            tools - but for me, the gritty problems are best solved with a
            notebook and pen. I’ve spent many hours by the canal at my local
            park in East London penning down drafts of what I’m working on.
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          <h2 className="text-xl w-full pb-2 font-medium">Interests</h2>
          <p className="w-full">
            Outside of work, I find joy in photography, sport, and Legos. I’ve
            also recently taken up archery, and have been learning Japanese on
            Duolingo for over a year.
          </p>
          <CardStack items={hobbyImgs} />
        </div>
        <div className="w-full">
          <h2 className="text-xl pb-2 font-medium">Travel</h2>
          <TravelAccordion />
        </div>
        <div className="w-full">
          <h2 className="text-xl pb-2 font-medium">Prized Possessions</h2>
          <p>
            Some of my favourite things that add value to my life every day.
          </p>
        </div>
        <div className="grid grid-cols-2 w-full gap-6 md:grid-cols-4">
          <PossessionCard imgUrl={cameraImg} label="Fujifilm XT-50" />
          <PossessionCard imgUrl={garminImg} label="Garmin Vivosmart 5" />
          <PossessionCard
            imgUrl={backpackImg}
            label="Superdry Montant Rucksack"
          />
          <Link
            href={"/prized-possessions"}
            className="border-[0.33px] bg-neutral-900 text-white aspect-square rounded-xl p-2 flex flex-col gap-2 items-center justify-center"
          >
            <ArrowRight size={48} />
            <div>See All</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
