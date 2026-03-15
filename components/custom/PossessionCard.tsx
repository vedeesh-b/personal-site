import Image, { StaticImageData } from "next/image";

type PossessionCardProps = {
  imgUrl: StaticImageData;
  label: string;
};

export const PossessionCard = ({ imgUrl, label }: PossessionCardProps) => {
  return (
    <div className="border-[1px] relative aspect-square text-white rounded-xl flex flex-col gap-2 items-center justify-center">
      <Image
        src={imgUrl}
        fill
        alt={label}
        className="relative p-6 object-contain"
      />
      <div>{label}</div>
    </div>
  );
};
