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
            <CurrentProject />
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
      title: "synapseVR",
      text: "Process behind building synapseVR",
      btn: {
        text: "More info",
        href: "",
      },
    },
    src: "",
    alt: "",
  },
  {
    layout: {
      title: "F1 TireStrat",
      text: "Process behind building F1 tire strategy dataviz",
      btn: {
        text: "More info",
        href: "",
      },
    },
    src: "",
    alt: "",
  },
  {
    layout: {
      title: "AAC Dashboard",
      text: "Process behind building AAC Dashboard",
      btn: {
        text: "More info",
        href: "",
      },
    },
    src: "",
    alt: "",
  },
];
