import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import tech_stack from "../../assets/icon_stack.png";
import timeline from "../../assets/icon_timeline.png";
import contributions from "../../assets/icon_contributions.png";

export default function SynapseVR() {
  const cardGroupData = [
    {
      src: tech_stack,
      title: "Tech Stack",
      description: "React, JavaScript, D3.js, Figma",
      icon_background: "#afcaff",
    },
    {
      src: timeline,
      title: "Timeline",
      description: "3 months [04/2023 - 06/2023]",
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
          <h1 className="project-title">synapseVR</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
