import Image, { StaticImageData } from "next/image";

type FeedCardProps = {
  title: string;
  imgUrl?: StaticImageData;
  date: Date;
};

export const FeedCard = ({ title, imgUrl, date }: FeedCardProps) => {
  return (
    <div className="w-full flex flex-col items-start border-[0.33px] rounded-xl p-2 gap-4">
      {imgUrl && (
        <div className="w-full rounded-lg border-[0.33px]">
          <Image
            src={imgUrl}
            alt={title}
            className="w-full object-cover rounded-sm"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 text-start">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-gray-600">{date.toDateString()}</p>
      </div>
    </div>
  );
};

export const FeedPreview = () => {
  return (
    <div className="w-full flex flex-col pb-30">
      <div className="text-start font-medium pb-4">Latest Musings</div>
      <div className="flex flex-col gap-4">
        <FeedCard title="Duolingo: Utility vs UX" date={new Date()} />
        <FeedCard
          title="Duolingo: Utility vs UX"
          date={new Date("March 1, 2026")}
        />
      </div>
    </div>
  );
};
