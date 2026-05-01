"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AlcarazArticle } from "@/app/api/alcaraz-news/route";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 36e5);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

export function AlcarazModal({ open, onOpenChange }: Props) {
  const [article, setArticle] = useState<AlcarazArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!open || fetched) return;
    setLoading(true);
    fetch("/api/alcaraz-news")
      .then((r) => r.json())
      .then((data) => {
        setArticle(data ?? null);
        setFetched(true);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setFetched(true);
        setLoading(false);
      });
  }, [open, fetched]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0">
        {/* Cover photo — plain img to avoid next/image remotePattern config */}
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          <img
            src="https://ichef.bbci.co.uk/ace/standard/954/cpsprodpb/7dd8/live/72433610-3ff9-11f1-afbb-e15d65961cef.jpg"
            alt="Carlos Alcaraz"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="px-6 pt-5 pb-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[17px] font-medium">
              <span>Carlos Alcaraz</span>
              <span className="text-xl">🎾</span>
            </DialogTitle>
          </DialogHeader>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
            I've been told he's my doppelgänger (including a comment in my
            guestbook), so I built this news feed to keep up with what he's up
            to.
          </p>
        </div>

        <Separator className="mt-4" />

        <div className="px-6 py-4">
          {loading && (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
            </div>
          )}

          {(error || (!loading && fetched && !article)) && (
            <p className="text-[12px] text-muted-foreground">
              {error
                ? "Could not load news. Check NEWS_API_KEY."
                : "No recent news found."}
            </p>
          )}

          {!loading && article && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-[11px] font-normal">
                  {article.source}
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  {timeAgo(article.publishedAt)}
                </span>
              </div>
              <p className="text-[13px] font-medium leading-snug group-hover:underline underline-offset-2">
                {article.title}
              </p>
              {article.description && (
                <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              )}
              <p className="text-[11px] text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                Read more →
              </p>
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
