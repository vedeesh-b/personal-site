import Image, { StaticImageData } from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type StickyNoteProps = {
  imgUrl: StaticImageData;
  message: string;
  name: string;
  social: string;
};

export const StickyNote = ({
  imgUrl,
  message,
  name,
  social,
}: StickyNoteProps) => {
  return (
    <div className="w-80 h-80 relative">
      <Image fill alt="green" src={imgUrl} />
      <div className="absolute w-full h-full z-10 p-6 font-mono flex flex-col justify-between">
        <p>{message}</p>
        <div className="flex flex-col gap-2">
          {social ? (
            <a href={social}>
              <p className="text-sm text-muted-foreground">{name}</p>
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">{name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const StickyNoteTemplate = ({ imgUrl }: { imgUrl: StaticImageData }) => {
  return (
    <div className="w-80 h-80 relative">
      <Image fill alt="green" src={imgUrl} />
      <div className="absolute w-full h-full z-10 p-6 font-mono flex flex-col justify-between">
        <Textarea
          className="min-h-[calc(100%-116px)] max-h-[calc(100%-116px)]"
          placeholder="Leave a message!"
        />
        <div className="flex flex-col gap-2">
          <Input id="name" placeholder="Name" />
          <Input id="social" placeholder="Social media (optional)" />
        </div>
      </div>
    </div>
  );
};
