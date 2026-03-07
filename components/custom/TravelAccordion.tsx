import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const TravelAccordion = () => {
  const items = [
    {
      value: "2025",
      content: [
        {
          country: "Japan",
          cities: ["Osaka", "Kyoto", "Tokyo"],
        },
        {
          country: "Malta",
          cities: ["Valetta"],
        },
        {
          country: "UAE",
          cities: ["Dubai"],
        },
      ],
    },
    {
      value: "2024",
      content: [
        {
          country: "The Netherlands",
          cities: ["Amsterdam"],
        },
        {
          country: "Czech Republic",
          cities: ["Prague"],
        },
        {
          country: "Spain",
          cities: ["Barcelona"],
        },
      ],
    },
    {
      value: "2018 - 2019",
      content: [
        {
          country: "United Kingdom",
          cities: ["London, Cambridge"],
        },
      ],
    },
    {
      value: "2017",
      content: [
        {
          country: "Hong Kong",
          cities: ["Hong Kong Island"],
        },
      ],
    },
    {
      value: "2016",
      content: [
        {
          country: "Indonesia",
          cities: ["Bali"],
        },
      ],
    },
    {
      value: "2012 - 2013",
      content: [
        {
          country: "Seychelles",
          cities: ["Mahe"],
        },
      ],
    },
    {
      value: "2011",
      content: [
        {
          country: "Maldives",
          cities: ["Male"],
        },
      ],
    },
    {
      value: "2010",
      content: [
        {
          country: "Singapore",
          cities: ["Singapore"],
        },
      ],
    },
  ];
  return (
    <Accordion type="multiple" className="w-full" defaultValue={[`2025`]}>
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
                  <div className="font-medium">{i.country}</div>
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
