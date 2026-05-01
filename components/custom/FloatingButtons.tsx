"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlcarazModal } from "@/components/custom/AlcarazSheet";
import { FlagGame } from "@/components/custom/FlagGame";

export function FloatingButtons() {
  const [alcarazOpen, setAlcarazOpen] = useState(false);
  const [flagGameOpen, setFlagGameOpen] = useState(false);

  return (
    <>
      {/*
       * Desktop: top-right corner aligned with the navbar (top-4, body padding).
       * Mobile: bottom-right corner as floating actions — avoids the centered navbar.
       */}
      <div className="fixed z-50 flex flex-col gap-2 bottom-6 right-6 md:flex-row md:bottom-auto md:top-4 md:right-20 lg:right-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAlcarazOpen(true)}
          className="h-10 w-10 rounded-full bg-white shadow-md border-[0.33px] text-lg hover:scale-105 transition-transform"
          aria-label="Carlos Alcaraz news"
        >
          🎾
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setFlagGameOpen(true)}
          className="h-10 w-10 rounded-full bg-white shadow-md border-[0.33px] text-lg hover:scale-105 transition-transform"
          aria-label="Flag guessing game"
        >
          🚩
        </Button>
      </div>

      <AlcarazModal open={alcarazOpen} onOpenChange={setAlcarazOpen} />
      <FlagGame open={flagGameOpen} onOpenChange={setFlagGameOpen} />
    </>
  );
}
