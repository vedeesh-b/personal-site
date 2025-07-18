import Card, { type CardProps } from "~/components/card";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import CurrentProject from "~/sections/currentProject";
import SynapseSplash from "../../assets/SynapseSplash.png";
import F1Splash from "../../assets/f1_splash.png";
import AAC_Splash from "../../assets/AAC Splash.png";

export default function Projects() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>Projects</h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* <CurrentProject /> */}
            {projectCards.map((project, key) => (
              <Card {...project} key={key} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const projectCards: CardProps[] = [
  {
    layout: {
      key: "01",
      title: "synapseVR",
      text: ["UI Design", "E-learning"],
      btn: {
        text: "More info",
        href: "/projects/synapse-vr",
      },
    },
    src: SynapseSplash,
    alt: "",
  },
  {
    layout: {
      key: "02",
      title: "F1 TireStrat",
      text: ["Python, JavaScript", "Sports analytics"],
      btn: {
        text: "More info",
        href: "/projects/f1-tirestrats",
      },
    },
    src: F1Splash,
    alt: "Splash image for F1 tirestrats project",
  },
  {
    layout: {
      key: "03",
      title: "AAC Dashboard",
      text: ["React", "Data visualisation"],
      btn: {
        text: "More info",
        href: "/projects/aac",
      },
    },
    src: AAC_Splash,
    alt: "Splash image for AAC dashboard",
  },
];
