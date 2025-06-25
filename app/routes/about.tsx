import Card, { type CardProps } from "~/components/card";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

import durdle_door from "../assets/durdle_door.webp";

export default function About() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>About</h1>
          <div className="about-card">
            {infoCards.intro.layout.text}
            <div>
              <img
                width="230px"
                src={infoCards.intro.src}
                alt={infoCards.intro.alt}
              />
            </div>
          </div>
          <div>
            <h1 style={{ maxWidth: "100%", width: "25ch" }}>
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
            {infoCards.sport.layout.text}
            <div>
              <img
                width="230px"
                src={infoCards.intro.src}
                alt={infoCards.intro.alt}
              />
            </div>
          </div>
          <div className="about-card">
            <div
              style={{
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              {infoCards.photography.layout.text}
              {infoCards.photography.layout.btn}
            </div>
            <div>
              <img
                width="230px"
                src={infoCards.intro.src}
                alt={infoCards.intro.alt}
              />
            </div>
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
      text: (
        <div>
          <p>
            My professional journey spans front-end engineering and design roles
            at bp and Intropic, where I’ve had the chance to explore how
            large-scale systems and fast-moving startups use technology to solve
            domain-specific challenges.
          </p>
          <p>
            While at university, I worked with the Human-Computer Interaction
            Lab led by Dr. Timothy Neate. During my final year, I was awarded a
            research fellowship at the Lab where I designed an interactive
            dashboard for assistive communication devices - combining
            accessibility, interface design, and data visualisation.
          </p>
          <p>
            Outside of work, I find joy in sports, photography, and building
            with Lego. I also maintain a digital travel journal, powered by my
            DSLR.
          </p>
        </div>
      ),
    },
    src: durdle_door,
    alt: "Portrait of Vedeesh Bali at Durdle Door in Dorset, United Kingdom.",
  },
  sport: {
    layout: {
      text: (
        <div>
          <p>
            I’ve been watching and playing cricket since I was nine years old.
            Moving to the UK gave me the opportunity to represent King’s College
            London CC across various competitions and Old Albanians CC in the
            Hertfordshire Cricket League.
          </p>
          <p>
            Formula 1 has also been an active interest of mine since 2023. I’m a
            big Ferrari fan, which probably speaks for my mental strength and
            optimism.
          </p>
          <p>I also enjoy rollerblading, pool, and darts.</p>
        </div>
      ),
    },
    src: "",
    alt: "",
  },
  photography: {
    layout: {
      text: (
        <div>
          <p>
            My journey in photography started with capturing the sunrise from my
            grandparents’ house in Jaipur using my old iPhone 5s.
          </p>
          <p>
            While I’ve upgraded to a Canon PowerShot SX50 HS since, my
            appreciation for discovering fresh perspectives in nature and
            civilisation has remained intact.
          </p>
        </div>
      ),
      btn: <button>Full portfolio</button>,
    },
    src: "",
    alt: "",
  },
};
