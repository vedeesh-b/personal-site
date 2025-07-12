import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import F1Splash from "../../assets/f1_splash.png";
import CardGroup from "~/components/cardGroup";

import tech_stack from "../../assets/icon_stack.png";
import timeline from "../../assets/icon_timeline.png";
import contributions from "../../assets/icon_contributions.png";

export default function F1Datavis() {
  const cardGroupData = [
    {
      src: tech_stack,
      title: "Tech Stack",
      description: "Python, JavaScript, D3.js, Figma",
      icon_background: "#afcaff",
    },
    {
      src: timeline,
      title: "Timeline",
      description: "4 months [01/2023 - 04/2023]",
      icon_background: "#ffd0af",
    },
    {
      src: contributions,
      title: "Contributions",
      description: "Data analysis, dataviz, front-end development",
      icon_background: "#ffafe2",
    },
  ];

  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 className="project-title">F1 TireStrats</h1>
          <img
            src={F1Splash}
            alt="F1 TireStrats splash image"
            width="100%"
            className="splash-img"
          />
          <CardGroup data={cardGroupData} />
          <h2>The Problem</h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
