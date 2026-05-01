"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FlagEntry {
  country: string;
  flag: string;
}

interface FlagPair {
  a: FlagEntry;
  b: FlagEntry;
  fact: string;
}

const FLAG_PAIRS: FlagPair[] = [
  {
    a: { country: "Chad", flag: "🇹🇩" },
    b: { country: "Romania", flag: "🇷🇴" },
    fact: "Chad's blue stripe is slightly darker than Romania's cobalt. The similarity has been raised at the UN.",
  },
  {
    a: { country: "Austria", flag: "🇦🇹" },
    b: { country: "Peru", flag: "🇵🇪" },
    fact: "Austria's red-white-red dates to the 13th century — one of the world's oldest national flag designs.",
  },
  {
    a: { country: "Indonesia", flag: "🇮🇩" },
    b: { country: "Monaco", flag: "🇲🇨" },
    fact: "The two flags are identical in design. Indonesia's is slightly wider (2:3 vs Monaco's 4:5 ratio).",
  },
  {
    a: { country: "Ireland", flag: "🇮🇪" },
    b: { country: "Côte d'Ivoire", flag: "🇨🇮" },
    fact: "These flags are exact mirrors of each other — Ireland is green-white-orange; Côte d'Ivoire reverses that.",
  },
  {
    a: { country: "Netherlands", flag: "🇳🇱" },
    b: { country: "Luxembourg", flag: "🇱🇺" },
    fact: "Luxembourg's blue stripe is a lighter sky-blue vs. Netherlands' deep cobalt. Easy to miss.",
  },
  {
    a: { country: "New Zealand", flag: "🇳🇿" },
    b: { country: "Australia", flag: "🇦🇺" },
    fact: "New Zealand's stars are red with white outline; Australia has 6 stars and a large Commonwealth Star below the Union Jack.",
  },
  {
    a: { country: "Norway", flag: "🇳🇴" },
    b: { country: "Iceland", flag: "🇮🇸" },
    fact: "Norway is red with blue cross. Iceland swaps them — blue with red cross. The colors are literally inverted.",
  },
  {
    a: { country: "Colombia", flag: "🇨🇴" },
    b: { country: "Ecuador", flag: "🇪🇨" },
    fact: "Both share yellow-blue-red from the old Gran Colombia. Ecuador adds a coat of arms in the center.",
  },
  {
    a: { country: "Slovenia", flag: "🇸🇮" },
    b: { country: "Slovakia", flag: "🇸🇰" },
    fact: "Both are white-blue-red tricolors with a coat of arms on the left — the crests are the only real tell.",
  },
  {
    a: { country: "Senegal", flag: "🇸🇳" },
    b: { country: "Mali", flag: "🇲🇱" },
    fact: "Mali dropped the green star from a shared design when the Mali Federation dissolved in 1960.",
  },
];

const TOTAL_ROUNDS = 8;

type Phase = "question" | "feedback" | "results";

interface Round {
  pair: FlagPair;
  left: FlagEntry;
  right: FlagEntry;
  target: FlagEntry;
  other: FlagEntry;
}

function buildRound(pair: FlagPair): Round {
  const flip = Math.random() < 0.5;
  const left = flip ? pair.b : pair.a;
  const right = flip ? pair.a : pair.b;
  const targetLeft = Math.random() < 0.5;
  const target = targetLeft ? left : right;
  const other = targetLeft ? right : left;
  return { pair, left, right, target, other };
}

function shuffleOnce<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildGameRounds(): Round[] {
  return shuffleOnce(FLAG_PAIRS)
    .slice(0, TOTAL_ROUNDS)
    .map(buildRound);
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FlagGame({ open, onOpenChange }: Props) {
  const [rounds, setRounds] = useState<Round[]>(() => buildGameRounds());
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [correct, setCorrect] = useState(false);
  const [chosen, setChosen] = useState<FlagEntry | null>(null);

  const resetGame = useCallback(() => {
    setRounds(buildGameRounds());
    setRoundIndex(0);
    setScore(0);
    setPhase("question");
    setCorrect(false);
    setChosen(null);
  }, []);

  const round = rounds[roundIndex];

  function handleGuess(picked: FlagEntry) {
    const isCorrect = picked.country === round.target.country;
    setCorrect(isCorrect);
    setChosen(picked);
    if (isCorrect) setScore((s) => s + 1);
    setPhase("feedback");
  }

  function handleNext() {
    if (roundIndex + 1 >= TOTAL_ROUNDS) {
      setPhase("results");
    } else {
      setRoundIndex((i) => i + 1);
      setPhase("question");
      setChosen(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[18px] font-medium">
              <span className="text-2xl">🚩</span>
              Flag Showdown
            </span>
            {phase !== "results" && (
              <Badge variant="secondary" className="text-[12px] font-normal tabular-nums">
                {roundIndex + 1} / {TOTAL_ROUNDS} · {score} pts
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        {phase === "results" ? (
          <div className="flex flex-col items-center gap-6 py-6 text-center">
            <p className="text-5xl">
              {score >= 7 ? "🏆" : score >= 4 ? "🎯" : "📚"}
            </p>
            <div>
              <p className="text-[22px] font-medium">
                {score} / {TOTAL_ROUNDS}
              </p>
              <p className="text-[13px] text-muted-foreground mt-1">
                {score >= 7
                  ? "Vexillology expert."
                  : score >= 4
                  ? "Decent flag knowledge!"
                  : "Time to brush up on flags."}
              </p>
            </div>
            <Button onClick={resetGame} className="w-full">
              Play again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-4">
            {phase === "question" && (
              <p className="text-center text-[15px] font-medium">
                Which flag is{" "}
                <span className="font-semibold">{round.target.country}</span>?
              </p>
            )}

            {phase === "feedback" && (
              <div className="text-center">
                <p className="text-[15px] font-medium">
                  {correct ? "✅ Correct!" : "❌ Not quite."}
                  {!correct && (
                    <span>
                      {" "}That was{" "}
                      <span className="font-semibold">{chosen?.flag} {chosen?.country}</span>.
                    </span>
                  )}
                </p>
                <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
                  {round.pair.fact}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {[round.left, round.right].map((entry) => {
                let ringClass = "";
                if (phase === "feedback") {
                  if (entry.country === round.target.country) {
                    ringClass = "ring-2 ring-green-500";
                  } else if (chosen?.country === entry.country) {
                    ringClass = "ring-2 ring-red-400";
                  }
                }
                return (
                  <button
                    key={entry.country}
                    disabled={phase === "feedback"}
                    onClick={() => handleGuess(entry)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-[0.33px] p-6 transition-all
                      ${phase === "question" ? "hover:bg-muted cursor-pointer" : "cursor-default"}
                      ${ringClass}`}
                  >
                    <span className="text-6xl leading-none select-none">{entry.flag}</span>
                    {phase === "feedback" && (
                      <span className="text-[12px] text-muted-foreground font-medium">
                        {entry.country}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {phase === "feedback" && (
              <Button onClick={handleNext} className="w-full">
                {roundIndex + 1 >= TOTAL_ROUNDS ? "See results" : "Next flag →"}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
