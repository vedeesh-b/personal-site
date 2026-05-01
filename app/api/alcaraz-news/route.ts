import { NextResponse } from "next/server";

export interface AlcarazArticle {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
}

type RawArticle = {
  title?: string;
  description?: string | null;
  url?: string;
  publishedAt?: string;
  source?: { name?: string };
};

function scoreArticle(article: RawArticle) {
  const text =
    `${article.title ?? ""} ${article.description ?? ""}`.toLowerCase();
  let score = 0;

  if (text.includes("carlos alcaraz")) score += 10;
  if (text.includes("tennis")) score += 3;
  if (text.includes("atp")) score += 2;
  if (text.includes("grand slam")) score += 2;
  if (text.includes("wimbledon")) score += 2;
  if (text.includes("roland garros")) score += 2;
  if (article.title?.toLowerCase().includes("carlos alcaraz")) score += 5;

  return score;
}

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "NEWS_API_KEY not configured" },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    q: '"Carlos Alcaraz" AND (tennis OR ATP)',
    searchIn: "title,description",
    language: "en",
    sortBy: "relevancy",
    from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    pageSize: "20",
    apiKey,
  });

  const res = await fetch(
    `https://newsapi.org/v2/everything?${params.toString()}`,
    {
      next: { revalidate: 1800 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Failed to fetch news", details: text },
      { status: 502 },
    );
  }

  const data = await res.json();

  const best = (data.articles ?? [])
    .filter(
      (a: RawArticle) =>
        a.title && a.title !== "[Removed]" && a.url && a.publishedAt,
    )
    .sort((a: RawArticle, b: RawArticle) => {
      const scoreDiff = scoreArticle(b) - scoreArticle(a);
      if (scoreDiff !== 0) return scoreDiff;
      return (
        new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
      );
    })[0];

  if (!best) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    title: best.title!,
    description: best.description ?? null,
    url: best.url!,
    source: best.source?.name ?? "Unknown source",
    publishedAt: best.publishedAt!,
  } satisfies AlcarazArticle);
}
