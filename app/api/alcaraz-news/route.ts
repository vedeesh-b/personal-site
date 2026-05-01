import { NextResponse } from "next/server";

export interface AlcarazArticle {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
}

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "NEWS_API_KEY not configured" }, { status: 500 });
  }

  // Exact phrase match so only articles explicitly about Carlos Alcaraz are returned.
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=%22Carlos+Alcaraz%22&language=en&sortBy=publishedAt&pageSize=1&apiKey=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 502 });
  }

  const data = await res.json();
  const raw = (data.articles ?? []).find(
    (a: { title?: string }) => a.title && a.title !== "[Removed]"
  );

  if (!raw) {
    return NextResponse.json(null);
  }

  const article: AlcarazArticle = {
    title: raw.title,
    description: raw.description ?? null,
    url: raw.url,
    source: raw.source.name,
    publishedAt: raw.publishedAt,
  };

  return NextResponse.json(article);
}
