import { layout } from "@react-router/dev/routes";
import Card from "~/components/card";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import CurrentProject from "~/sections/currentProject";

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

const projectCards = [
  {
    layout: {
      key: "01",
      title: "synapseVR",
      text: "Process behind building synapseVR",
      btn: {
        text: "More info",
        href: "/projects/synapse-vr",
      },
    },
    src: undefined,
    alt: "",
  },
  {
    layout: {
      key: "02",
      title: "F1 TireStrat",
      text: "Process behind building F1 tire strategy dataviz",
      btn: {
        text: "More info",
        href: "/projects/f1-tirestrats",
      },
    },
    src: undefined,
    alt: "",
  },
  {
    layout: {
      key: "03",
      title: "AAC Dashboard",
      text: "Process behind building AAC Dashboard",
      btn: {
        text: "More info",
        href: "/projects/aac",
      },
    },
    src: undefined,
    alt: "",
  },
];
