import "./components.css";
import JapanFlag from "../assets/flags/jpn.svg?react";
import SpainFlag from "../assets/flags/esp.svg?react";
import CzechiaFlag from "../assets/flags/cze.svg?react";
import NetherlandsFlag from "../assets/flags/nld.svg?react";
import UKFlag from "../assets/flags/gb.svg?react";
import HongKongFlag from "../assets/flags/hk.svg?react";
import IndonesiaFlag from "../assets/flags/id.svg?react";
import SeychellesFlag from "../assets/flags/sey.svg?react";
import MaldivesFlag from "../assets/flags/mal.svg?react";
import SingaporeFlag from "../assets/flags/sin.svg?react";

export const CountryList = () => {
  return (
    <div id="countries-list">
      {visitedCountries.map((visit, key) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {visit.countryName}
            {visit.flag}
          </div>
          {visit.year}
        </div>
      ))}
    </div>
  );
};

const visitedCountries = [
  {
    countryName: "Japan",
    flag: <JapanFlag height={10} />,
    year: "2025",
  },
  {
    countryName: "Spain",
    flag: <SpainFlag height={10} />,
    year: "2024",
  },
  {
    countryName: "Czechia",
    flag: <CzechiaFlag height={10} />,
    year: "2024",
  },
  {
    countryName: "Netherlands",
    flag: <NetherlandsFlag height={10} />,
    year: "2024",
  },
  {
    countryName: "United Kingdom",
    flag: <UKFlag height={10} />,
    year: "2018, 19",
  },
  {
    countryName: "Hong Kong",
    flag: <HongKongFlag height={10} />,
    year: "2017",
  },
  {
    countryName: "Indonesia",
    flag: <IndonesiaFlag height={10} />,
    year: "2016",
  },
  {
    countryName: "Seychelles",
    flag: <SeychellesFlag height={10} />,
    year: "2012, 13",
  },
  {
    countryName: "Maldives",
    flag: <MaldivesFlag height={10} />,
    year: "2011",
  },
  {
    countryName: "Singapore",
    flag: <SingaporeFlag height={10} />,
    year: "2010",
  },
];
