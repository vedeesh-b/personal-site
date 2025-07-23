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
import IndiaFlag from "../assets/flags/ind.svg?react";
import type { ReactNode } from "react";

type VisitType = {
  countryName: string;
  flag: ReactNode;
  year: string;
  key: number;
  label: string;
};

const Visit = ({ countryName, flag, year, key, label }: VisitType) => {
  return (
    <div
      key={key}
      style={
        !(label === "")
          ? { backgroundColor: "beige", padding: "6px", fontSize: "14px" }
          : {}
      }
    >
      <div>
        {label + countryName}
        {flag}
      </div>
      {year}
    </div>
  );
};

export const CountryList = () => {
  return (
    <div id="countries-list">
      {visitedCountries.map((visit, key) => (
        <Visit
          countryName={visit.countryName}
          key={key}
          flag={visit.flag}
          year={visit.year}
          label={visit.label}
        />
      ))}
    </div>
  );
};

const visitedCountries = [
  {
    countryName: "Japan",
    flag: <JapanFlag height={10} />,
    year: "2025",
    label: "",
  },
  {
    countryName: "Spain",
    flag: <SpainFlag height={10} />,
    year: "2024",
    label: "",
  },
  {
    countryName: "Czechia",
    flag: <CzechiaFlag height={10} />,
    year: "2024",
    label: "",
  },
  {
    countryName: "Netherlands",
    flag: <NetherlandsFlag height={10} />,
    year: "2024",
    label: "",
  },
  {
    countryName: "United Kingdom",
    flag: <UKFlag height={10} />,
    year: "2021",
    label: "Moved to ",
  },
  {
    countryName: "United Kingdom",
    flag: <UKFlag height={10} />,
    year: "2018, 19",
    label: "",
  },
  {
    countryName: "Hong Kong",
    flag: <HongKongFlag height={10} />,
    year: "2017",
    label: "",
  },
  {
    countryName: "Indonesia",
    flag: <IndonesiaFlag height={10} />,
    year: "2016",
    label: "",
  },
  {
    countryName: "Seychelles",
    flag: <SeychellesFlag height={10} />,
    year: "2012, 13",
    label: "",
  },
  {
    countryName: "Maldives",
    flag: <MaldivesFlag height={10} />,
    year: "2011",
    label: "",
  },
  {
    countryName: "Singapore",
    flag: <SingaporeFlag height={10} />,
    year: "2010",
    label: "",
  },
  {
    countryName: "India",
    flag: <IndiaFlag height={10} />,
    year: "2002",
    label: "Raised in ",
  },
];
