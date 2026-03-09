import { truncateText } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

import bookImg from "@/assets/body-language-book-cover.jpg";
import gridlockImg from "@/assets/gridlock-icon.png";

type CurrentItemType = {
  header: string;
  title: string;
  subtitle: string;
  imgUrl: StaticImageData | string;
};

const CurrentItem = ({ header, title, subtitle, imgUrl }: CurrentItemType) => {
  return (
    <div className="flex flex-col items-start border-[0.33px] rounded-sm p-2 gap-4">
      <div className="uppercase font-mono tracking-[5%] text-sm font-medium text-gray-500">
        {header}
      </div>
      <div className="flex flex-row gap-4 h-20">
        <div className="relative h-full w-20 rounded-sm border-[0.33px]">
          <Image
            className="relative object-cover p-1 rounded-sm"
            src={imgUrl}
            alt={title}
            fill
          />
        </div>

        <div className="flex flex-col items-start justify-center text-start min-w-0">
          <div className="text-[20px] font-medium truncate">
            {truncateText(title, 22)}
          </div>
          <div className="text-[16px] text-gray-600 truncate">
            {truncateText(subtitle, 26)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CurrentlyCard = () => {
  const currentItems: CurrentItemType[] = [
    {
      header: "Listening",
      title: "I Follow Rivers - The Magician Remix",
      subtitle: "Lykke Li",
      imgUrl:
        "https://i.scdn.co/image/ab67616d000048513526a120761b8ff11389f1ec",
    },
    {
      header: "Reading",
      title: "The Definitive Book of Body Language",
      subtitle: "Allan & Barbara Pease",
      imgUrl: bookImg,
    },
    {
      header: "Building",
      title: "GridLock",
      subtitle: "F1-themed Bingo Card App",
      imgUrl: gridlockImg,
    },
  ];

  return (
    <div className="w-full pb-30">
      <div className="w-full text-start font-medium pb-4">Currently</div>
      <div className="flex flex-col w-full border-[0.33px] rounded-md p-1 gap-1">
        {currentItems.map((item) => (
          <CurrentItem
            key={item.header}
            header={item.header}
            title={item.title}
            subtitle={item.subtitle}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};
