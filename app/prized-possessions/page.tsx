import { PossessionCard } from "@/components/custom/PossessionCard";

import cameraImg from "@/assets/possessions/camera.webp";
import backpackImg from "@/assets/possessions/backpack.jpg";
import garminImg from "@/assets/possessions/garmin.png";
import pixelatedGlassesImg from "@/assets/possessions/pixelated-sunglasses.jpg";
import memeBookImg from "@/assets/possessions/book-of-memes.jpeg";
import csFlagImg from "@/assets/possessions/carlos-sainz-flag.jpeg";
import watchImg from "@/assets/possessions/watch.png";
import cubeImg from "@/assets/possessions/cube.jpeg";

export default function PrizedPossessions() {
  const possessions = [
    {
      label: "Fujifilm XT-50",
      imgUrl: cameraImg,
    },
    {
      label: "Garmin Vivosmart 5",
      imgUrl: garminImg,
    },
    {
      label: "Superdry Montant Rucksack",
      imgUrl: backpackImg,
    },
    {
      label: "Pixelated Sunglasses",
      imgUrl: pixelatedGlassesImg,
    },
    {
      label: "Book of Tall Memes",
      imgUrl: memeBookImg,
    },
    {
      label: "Carlos Sainz Flag",
      imgUrl: csFlagImg,
    },
    {
      label: "Rotary Pilot Chronograph",
      imgUrl: watchImg,
    },
    {
      label: "Mirror Cube (Broken)",
      imgUrl: cubeImg,
    },
  ];
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <div>
        <h1 className="text-2xl pb-2 font-medium w-full text-start">
          Prized Possessions
        </h1>
        <p>More of my favourite things that add value to my life every day.</p>
      </div>
      <div className="grid grid-cols-2 w-full aspect-square gap-6">
        {possessions.map((possession) => (
          <PossessionCard
            key={possession.label}
            imgUrl={possession.imgUrl}
            label={possession.label}
          />
        ))}
      </div>
    </div>
  );
}
