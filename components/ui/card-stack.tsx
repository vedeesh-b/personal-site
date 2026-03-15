"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";

let interval: any;

type Card = {
  id: number;
  name: string;
  imgUrl: StaticImageData;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 4000);
  };

  return (
    <div className="relative mt-14 mb-4 h-60 w-60 md:h-96 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white h-60 w-60 md:h-96 md:w-96 rounded-3xl p-2 shadow-xl border-[0.33px] shadow-black/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={card.imgUrl}
                alt={card.name}
                className="relative aspect-square object-cover rounded-xl"
                fill
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
