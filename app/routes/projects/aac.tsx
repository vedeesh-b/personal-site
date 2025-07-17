import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import AAC_Splash from "../../assets/AAC Splash.png";

import tech_stack from "../../assets/icon_stack.png";
import timeline from "../../assets/icon_timeline.png";
import contributions from "../../assets/icon_contributions.png";
import CardGroup from "~/components/cardGroup";
import AAC_Stickies from "../../assets/AAC_Stickies.png";
import AAC_Components from "../../assets/AAC_Components.png";
import AAC_Final from "../../assets/AAC_Final.png";

export default function AAC() {
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
          <h1 className="project-title">AAC Dashboard</h1>
          <img
            src={AAC_Splash}
            alt="AAC dashboard splash image"
            width="100%"
            className="splash-img"
          />
          <CardGroup data={cardGroupData} />
          <h2>Context</h2>
          <p>
            During my final year of university, I was accepted to a research
            fellowship at the Human Computer Interaction (HCI) Lab at King's
            College London. This involved improving the understanding around
            assistive communication devices and how decision-making could be
            improved within the space.
          </p>
          <p>
            The data being used for the project was a repository of 562 articles
            across the ACM DL and SCOPUS academic databases surrounding AAC
            devices and their data. I was given the creative freedom to extract
            as much information as possible.
          </p>
          <h2>Approach</h2>
          <img
            src={AAC_Stickies}
            alt="AAC dashboard methodology"
            width="100%"
          />
          <p>
            The dashboard is analytical in nature, which implies that its main
            purpose is dataset exploration and decision-making assistance. Based
            on this, visualisations were created keeping the following
            specifications in mind:
          </p>
          <ul>
            <li>Emphasizes data exploration, analysis, and decision-making.</li>
            <li>
              Provides interactive features and controls to manipulate and
              explore the data.
            </li>
            <li>
              Offers visual representations that allow users to identify
              patterns, trends, and relationships in the data.
            </li>
            <li>
              Supports drill-down capabilities to examine specific subsets of
              data in more detail.
            </li>
          </ul>
          <img
            src={AAC_Components}
            alt="AAC high-fidelity component prototypes"
            width="100%"
          />
          <p>
            JavaScript was my chosen language for the dashboard, because of its
            extensive web support and data visualisation capabilities.
            Specifically, I employed a React architecture for the web app and
            routing. Charts were rendered using D3.js - a powerful JavaScript
            library built for flexible and interactive data visualisation. In
            essence, it creates Scalable Vector Graphics (SVGs) styled using CSS
            and placed directly in the Document Object Model (DOM).
          </p>
          <h2>Final Output</h2>
          <img
            src={AAC_Final}
            alt="AAC dashboard implementation"
            width="100%"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
