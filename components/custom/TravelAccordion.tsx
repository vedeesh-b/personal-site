import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import albaniaFlag from "@/assets/flags/icons8-albania-100.png";
import japanFlag from "@/assets/flags/icons8-japan-50.png";
import maltaFlag from "@/assets/flags/icons8-malta-50.png";
import uaeFlag from "@/assets/flags/icons8-united-arab-emirates-50.png";
import netherlandsFlag from "@/assets/flags/icons8-netherlands-50.png";
import czechFlag from "@/assets/flags/icons8-czech-republic-50.png";
import spainFlag from "@/assets/flags/icons8-spain-flag-50.png";
import ukFlag from "@/assets/flags/icons8-great-britain-50.png";
import hongKongFlag from "@/assets/flags/icons8-hongkong-flag-50.png";
import indonesiaFlag from "@/assets/flags/icons8-indonesia-50.png";
import seychellesFlag from "@/assets/flags/icons8-seychelles-50.png";
import maldivesFlag from "@/assets/flags/icons8-maldives-50.png";
import singaporeFlag from "@/assets/flags/icons8-singapore-50.png";

export const TravelAccordion = () => {
  const items = [
    {
      value: "2026",
      content: [
        {
          country: "Albania",
          flag: albaniaFlag,
          cities: ["Tirana", "Saranda"],
        },
      ],
    },
    {
      value: "2025",
      content: [
        {
          country: "Japan",
          flag: japanFlag,
          cities: ["Osaka", "Kyoto", "Tokyo"],
        },
        {
          country: "Malta",
          flag: maltaFlag,
          cities: ["Valetta"],
        },
        {
          country: "UAE",
          flag: uaeFlag,
          cities: ["Dubai"],
        },
      ],
    },
    {
      value: "2024",
      content: [
        {
          country: "The Netherlands",
          flag: netherlandsFlag,
          cities: ["Amsterdam"],
        },
        {
          country: "Czech Republic",
          flag: czechFlag,
          cities: ["Prague"],
        },
        {
          country: "Spain",
          flag: spainFlag,
          cities: ["Barcelona"],
        },
      ],
    },
    {
      value: "2018 - 2019",
      content: [
        {
          country: "United Kingdom",
          flag: ukFlag,
          cities: ["London, Cambridge"],
        },
      ],
    },
    {
      value: "2017",
      content: [
        {
          country: "Hong Kong",
          flag: hongKongFlag,
          cities: ["Hong Kong Island"],
        },
      ],
    },
    {
      value: "2016",
      content: [
        {
          country: "Indonesia",
          flag: indonesiaFlag,
          cities: ["Bali"],
        },
      ],
    },
    {
      value: "2012 - 2013",
      content: [
        {
          country: "Seychelles",
          flag: seychellesFlag,
          cities: ["Mahe"],
        },
      ],
    },
    {
      value: "2011",
      content: [
        {
          country: "Maldives",
          flag: maldivesFlag,
          cities: ["Male"],
        },
      ],
    },
    {
      value: "2010",
      content: [
        {
          country: "Singapore",
          flag: singaporeFlag,
          cities: ["Singapore"],
        },
      ],
    },
  ];
  return (
    <Accordion type="multiple" className="w-full" defaultValue={["2026"]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.value}</AccordionTrigger>
          <AccordionContent>
            <ul>
              {item.content.map((i) => (
                <li
                  className="flex flex-row justify-between pb-6"
                  key={i.country}
                >
                  <div className="font-medium flex flex-row items-center justify-center gap-2">
                    {i.country}
                    <Image src={i.flag} alt={i.country} width={20} />
                  </div>
                  <div>{i.cities.join(", ")}</div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
