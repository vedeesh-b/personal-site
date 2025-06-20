import Card from "~/components/card";
import "../app.css";
import headshot from "../assets/headshot.webp";
import Header from "~/sections/header";
import About from "~/sections/about";

export default function Landing() {
  const currentProject = {
    layout: {
      key: "Currently building",
      title: "P1 Dashboard",
      text: "Process behind building P1 Dashboard",
    },
    src: headshot,
    alt: "P1 dashboard img",
  };

  return (
    <>
      <div id="landing-section">
        <Header />
        <About />
        <Card {...currentProject} />
      </div>
    </>
  );
}
