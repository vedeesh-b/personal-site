import Image, { StaticImageData } from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type PossessionCardProps = {
  imgUrl: StaticImageData;
  label: string;
};

export const PossessionCard = ({ imgUrl, label }: PossessionCardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="border-[1px] relative aspect-square text-white rounded-xl flex flex-col gap-2 items-center justify-center">
          <Image
            src={imgUrl}
            fill
            alt={label}
            className="relative p-6 object-contain hover:scale-93 transition-transform duration-300 ease-in-out"
          />
          <div>{label}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent side={"bottom"}>{label}</TooltipContent>
    </Tooltip>
  );
};
