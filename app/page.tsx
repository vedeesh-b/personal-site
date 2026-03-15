import { CurrentlyCard } from "@/components/custom/CurrentlyCard";
import { FeedPreview } from "@/components/custom/FeedCard";

import { PhotoCarousel } from "@/components/custom/PhotoCarousel";
import { SocialsCard } from "@/components/custom/SocialsCard";
import Image from "next/image";

import profilePicture from "@/assets/headshot.jpg";

export default function Home() {
  return (
    <div className="flex overflow-scroll items-center justify-center font-sans light:bg-white">
      <main className="flex min-h-[calc(100vh-88px)]  w-full max-w-3xl flex-col items-center justify-center text-center bg-white gap-30 pt-10">
        <div className="p-4 flex flex-col items-center justify-center gap-12 h-[calc(100vh-88px)]">
          <div className="relative h-50 w-50 border-[0.33px] rounded-4xl shadow-xl">
            <Image
              src={profilePicture}
              alt="Vedeesh Bali"
              fill
              className="relative p-2 rounded-[28px]"
            />
          </div>
          <div>
            <h1 className="text-4xl pb-2 font-medium">Hi, I'm Vedeesh.</h1>
            <div className="w-full flex items-center justify-center">
              <p className="text-[20px] md:w-[75%]">
                I’m a front-end engineer working on AI tooling, design systems,
                and fun consumer products.
              </p>
            </div>
          </div>
        </div>
        <CurrentlyCard />
        <PhotoCarousel />
        {/* <FeedPreview /> */}
        <SocialsCard />
      </main>
    </div>
  );
}
