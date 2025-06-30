import { useEffect, useRef, useState } from "react";

type CountryType = {
  properties: {
    ADMIN: string;
  };
};

const GlobeComponent = () => {
  const [Globe, setGlobe] = useState<any>(null);
  const [countries, setCountries] = useState({ features: [] });
  const globeRef = useRef<ReturnType<typeof Globe> | null>(null);

  const visitedCountries = [
    "Japan",
    "Spain",
    "Czechia",
    "Netherlands",
    "United Kingdom",
    "Hong Kong",
    "Indonesia",
    "Seychelles",
    "Maldives",
    "Singapore",
    "India",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-globe.gl").then((mod) => setGlobe(() => mod.default));
      fetch("/data/ne_110m_admin_0_countries.json")
        .then((res) => res.json())
        .then(setCountries);
    }
  }, []);

  useEffect(() => {
    if (!Globe) return;

    const interval = setInterval(() => {
      if (globeRef.current) {
        const current = globeRef.current;

        current.controls().enableZoom = false;
        current.controls().autoRotate = true;
        current.controls().autoRotateSpeed = 1.5;
        current.pointOfView({ lat: 40, lng: -3 });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [Globe]);

  const setHexPolygonColor = (country: string) => {
    return visitedCountries.includes(country) ? "#5682DB" : "#C7C8D1";
  };

  if (!Globe) return null;

  return (
    <div
      id="globe-container"
      style={{
        width: 500,
        height: 500,
        clipPath: "circle(50% at 50% 50%)",
        WebkitClipPath: "circle(50% at 50% 50%)",
        overflow: "hidden",
        cursor: "grab",
      }}
    >
      <Globe
        ref={globeRef}
        globeImageUrl="https://images.ctfassets.net/nnkxuzam4k38/49gp8M7icXzzcVLEld8xzL/6467d14e5d6769dedc8e8fd63f437e97/pure-white-background.jpg"
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.4}
        hexPolygonUseDots={true}
        hexPolygonColor={(d: CountryType) =>
          setHexPolygonColor(d.properties.ADMIN)
        }
        width={500}
        height={500}
      />
    </div>
  );
};

export default GlobeComponent;
