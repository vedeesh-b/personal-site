import { StickyNoteTemplate } from "@/components/custom/StickyNote";
import noteGreen from "@/assets/stickies/note-green.png";
import noteBlue from "@/assets/stickies/note-blue.png";
import notePink from "@/assets/stickies/note-pink.png";
import noteSky from "@/assets/stickies/note-sky.png";
import noteTeal from "@/assets/stickies/note-teal.png";
import noteYellow from "@/assets/stickies/note-yellow.png";

export default function Guestbook() {
  const noteImgs = [
    noteGreen,
    noteBlue,
    notePink,
    noteSky,
    noteTeal,
    noteYellow,
  ];

  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <div>
        <h1 className="text-2xl pb-2 font-medium w-full text-start">
          Guestbook
        </h1>
        <p>
          Handwritten sticky notes are my favourite method of communication.
          Inspired by @Eva Decker's guestbook on her personal website.
        </p>
      </div>
      <StickyNoteTemplate
        imgUrl={noteImgs[Math.floor(Math.random() * noteImgs.length)]}
      />
    </div>
  );
}
