import Image, { StaticImageData } from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { addGuestbookEntry } from "@/app/actions/addGuestbookEntry";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

type StickyNoteProps = {
  imgUrl: StaticImageData;
  message: string;
  name: string;
  social: string;
  date: Date;
};

export const StickyNote = ({
  imgUrl,
  message,
  name,
  social,
  date,
}: StickyNoteProps) => {
  return (
    <div className="w-80 h-80 relative md:w-72 md:h-72">
      <Image fill alt="green" src={imgUrl} />
      <div className="absolute w-full h-full z-10 p-6 font-mono flex flex-col justify-between">
        <p className="line-clamp-6 md:line-clamp-none">{message}</p>
        <div className="flex flex-col gap-1">
          {social ? (
            <a href={social.startsWith("http") ? social : `https://${social}`} target="_blank" rel="noopener noreferrer">
              <p className="text-gray-700 underline underline-offset-4 truncate md:whitespace-normal md:overflow-visible">
                {name}
              </p>
            </a>
          ) : (
            <p className="text-gray-700">{name}</p>
          )}
          <p className="text-gray-700">{date.toDateString().substring(4)}</p>
        </div>
      </div>
    </div>
  );
};

export const StickyNoteTemplate = ({ imgUrl }: { imgUrl: StaticImageData }) => {
  return (
    <form
      action={addGuestbookEntry}
      className="w-80 h-80 relative md:w-72 md:h-72"
    >
      <Image fill alt="sticky note" src={imgUrl} />
      <div className="absolute w-full h-full z-10 p-6 font-mono flex flex-col justify-between">
        <Textarea
          className="min-h-[calc(100%-116px)] max-h-[calc(100%-116px)]"
          placeholder="Leave a message!"
          name="message"
        />
        <div className="flex flex-col gap-2">
          <Input name="name" placeholder="Name" />
          <Input name="social" placeholder="Social media (optional)" />
          <Button className="absolute -bottom-5 self-end">
            Submit
            <Send size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};
