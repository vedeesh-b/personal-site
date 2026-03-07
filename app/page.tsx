import { CurrentlyCard } from "@/components/custom/CurrentlyCard";
import { FeedPreview } from "@/components/custom/FeedCard";

import { PhotoCarousel } from "@/components/custom/PhotoCarousel";
import { SocialsCard } from "@/components/custom/SocialsCard";

export default function Home() {
  return (
    <div className="flex overflow-scroll items-center justify-center font-sans light:bg-white">
      <main className="flex min-h-[calc(100vh-88px)]  w-full max-w-3xl flex-col items-center justify-center text-center bg-white pt-10">
        <div className="p-4 flex flex-col items-center justify-center gap-12 h-[calc(100vh-88px)]">
          <div className="h-50 w-50 border-[0.33px] rounded-4xl shadow-sm" />
          <div>
            <h1 className="text-4xl pb-2 font-medium">Hi, I'm Vedeesh.</h1>
            <p className="text-[20px]">
              I’m a front-end engineer working on AI tooling, design systems,
              and fun consumer products.
            </p>
          </div>
        </div>
        <CurrentlyCard />
        {/* <PhotoCarousel /> */}
        <FeedPreview />
        <SocialsCard />
      </main>
    </div>
  );
}
