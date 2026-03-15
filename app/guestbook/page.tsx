import { StickyNote, StickyNoteTemplate } from "@/components/custom/StickyNote";
import noteGreen from "@/assets/stickies/note-green.png";
import noteBlue from "@/assets/stickies/note-blue.png";
import notePink from "@/assets/stickies/note-pink.png";
import noteSky from "@/assets/stickies/note-sky.png";
import noteTeal from "@/assets/stickies/note-teal.png";
import noteYellow from "@/assets/stickies/note-yellow.png";
import { neon } from "@neondatabase/serverless";
import Link from "next/link";

export default async function Guestbook() {
  const noteImgs = [
    noteGreen,
    noteBlue,
    notePink,
    noteSky,
    noteTeal,
    noteYellow,
  ];

  const sql = neon(`${process.env.DATABASE_URL}`);
  const entries = await sql.query("SELECT * FROM guestbook ORDER BY id DESC");

  return (
    <div className="py-30 w-full flex justify-center">
      <div className=" flex flex-col items-center gap-8 text-start max-w-3xl justify-center">
        <div>
          <h1 className="text-2xl pb-2 font-medium w-full text-start">
            Guestbook
          </h1>
          <p>
            Handwritten sticky notes are my favourite method of communication.
            Inspired by{" "}
            <Link
              className="font-mono font-medium text-blue-600 underline underline-offset-[3.5px]"
              href={"https://eva.town/"}
              target="_blank"
            >
              @Eva Decker
            </Link>
            's guestbook on her personal website.
          </p>
        </div>

        <div className="pt-12 flex flex-col gap-8 md:grid md:grid-cols-2">
          <StickyNoteTemplate
            imgUrl={noteImgs[Math.floor(Math.random() * noteImgs.length)]}
          />
          {entries && entries.length > 0 ? (
            entries.map((note) => (
              <StickyNote
                key={note.id}
                imgUrl={noteImgs[Math.floor(Math.random() * noteImgs.length)]}
                message={note.message}
                name={note.name}
                social={note.social}
                date={note.created_at}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
