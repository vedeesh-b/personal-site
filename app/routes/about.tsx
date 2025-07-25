import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

import durdle_door from "../assets/durdle_door.webp";
import ferrari from "../assets/ferrari.jpeg";
import camera from "../assets/camera.jpeg";
import GlobeComponent from "~/components/globe";
import { CountryList } from "~/components/countryList";

export default function About() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>About</h1>
          <div className="about-card">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {infoCards.intro.layout.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <img
                width="230px"
                src={infoCards.intro.src}
                alt={infoCards.intro.alt}
              />
            </div>
          </div>
          <div className="quote-container">
            <h1>
              Great products need{" "}
              <span
                style={{
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#262626",
                }}
              >
                clever design
              </span>{" "}
              and{" "}
              <span
                style={{
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#262626",
                }}
              >
                effective code
              </span>{" "}
              to inform each other. That space is where I work best.
            </h1>
          </div>
          <div className="about-card">
            <div>
              {infoCards.sport.layout.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <img
                width="230px"
                src={infoCards.sport.src}
                alt={infoCards.sport.alt}
              />
            </div>
          </div>
          <div className="about-card">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {infoCards.photography.layout.text.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                role="button"
                href={infoCards.photography.layout.btn.href}
                target="_blank"
              >
                <button style={{ backgroundColor: "#2e2f38", color: "#fff" }}>
                  {infoCards.photography.layout.btn.text}
                </button>
              </a>
            </div>
            <div>
              <img
                width="230px"
                src={infoCards.photography.src}
                alt={infoCards.photography.alt}
              />
            </div>
          </div>
          <div className="globe-container">
            <CountryList />
            <GlobeComponent />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const infoCards = {
  intro: {
    layout: {
      text: [
        "My professional journey spans front-end engineering and design roles at bp and Intropic, where I've had the chance to explore how large-scale systems and fast-moving startups use technology to solve domain-specific challenges",
        "While at university, I worked with the Human-Computer Interaction Lab led by Dr. Timothy Neate. During my final year, I was awarded a research fellowship at the Lab where I designed an interactive dashboard for assistive communication devices - combining accessibility, interface design, and data visualisation.",
        "Outside of work, I find joy in sports, photography, and building with Lego. I also maintain a digital travel journal, powered by my DSLR.",
      ],
    },
    src: durdle_door,
    alt: "Portrait of Vedeesh Bali at Durdle Door in Dorset, United Kingdom.",
  },
  sport: {
    layout: {
      text: [
        "I’ve been watching and playing cricket since I was nine years old. Moving to the UK gave me the opportunity to represent King’s College London CC across various competitions and Old Albanians CC in the Hertfordshire Cricket League.",
        "Formula 1 has also been an active interest of mine since 2023. I’m a big Ferrari fan, which probably speaks for my mental strength and optimism.",
        "I also enjoy rollerblading, pool, and darts.",
      ],
    },
    src: ferrari,
    alt: "Vedeesh Bali at Suzuka Circuit watching the Japanese Grand Prix",
  },
  photography: {
    layout: {
      text: [
        "My journey in photography started with capturing the sunrise from my grandparents’ house in Jaipur using my old iPhone 5s.",
        "While I’ve upgraded to a Canon PowerShot SX50 HS since, my appreciation for discovering fresh perspectives in nature and civilisation has remained intact.",
      ],
      btn: {
        text: "Full Portfolio",
        href: "https://photos.vedeeshbali.com/",
      },
    },
    src: camera,
    alt: "Photography at Durdle Door, England.",
  },
};
