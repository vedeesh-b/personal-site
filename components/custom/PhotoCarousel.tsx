import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const PhotoCarousel = () => {
  const photos = [
    "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/cz_peacock.webp",
    "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/gb_kn_duck.webp",
    "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/jpn_osaka_castle.webp",
    "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/jpn_fuji.webp",
    "https://kj36h7e7wv1p9gx0.public.blob.vercel-storage.com/images/mlt_mdina.webp",
  ];

  return (
    <div className="w-full">
      <div className="w-full text-start font-medium pb-2">Photography</div>
      <InfiniteMovingCards direction="right" speed="slow" items={photos} />
      <Button asChild className="w-full mt-2 py-7 text-md rounded-full">
        <Link href={"https://photos.vedeeshbali.com/"} target="_blank">
          Check out more of my work
          <ExternalLink />
        </Link>
      </Button>
    </div>
  );
};
