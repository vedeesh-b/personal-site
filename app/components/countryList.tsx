import Flag from "react-world-flags";
import "./components.css";

export default function CountryList() {
  const visitedCountries = [
    {
      countryName: "Japan",
      code: "JPN",
      year: "2025",
    },
    {
      countryName: "Spain",
      code: "ESP",
      year: "2024",
    },
    {
      countryName: "Czechia",
      code: "CZE",
      year: "2024",
    },
    {
      countryName: "Netherlands",
      code: "NLD",
      year: "2024",
    },
    {
      countryName: "United Kingdom",
      code: "GBR",
      year: "2018, 19",
    },
    {
      countryName: "Hong Kong",
      code: "HKG",
      year: "2017",
    },
    {
      countryName: "Indonesia",
      code: "IDN",
      year: "2016",
    },
    {
      countryName: "Seychelles",
      code: "SYC",
      year: "2012, 13",
    },
    {
      countryName: "Maldives",
      code: "MDV",
      year: "2011",
    },
    {
      countryName: "Singapore",
      code: "SGP",
      year: "2010",
    },
  ];
  return (
    <div id="countries-list">
      {visitedCountries.map((visit, key) => (
        <div key={key}>
          {visit.countryName}
          <Flag code={visit.code} height={10} />
        </div>
      ))}
    </div>
  );
}
