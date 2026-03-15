"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const social = formData.get("social") as string;
  const message = formData.get("message") as string;

  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql.query(
    "INSERT INTO guestbook (name, social, message) VALUES ($1, $2, $3)",
    [name, social, message],
  );

  revalidatePath("/guestbook");
}
