import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import F1Splash from "../../assets/f1_splash.png";
import CardGroup from "~/components/cardGroup";
import F1Architecture from "../../assets/f1_architecture.png";
import F1Demo from "../../assets/f1-demo.gif";
import F1Components from "../../assets/f1-components.png";

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
          <p>
            In Formula 1, tire strategy is one of the most critical yet least
            visible aspects of race performance. Choosing the right compound,
            pit window, and response to changing track conditions can make or
            break a team’s result. With factors like weather, track degradation,
            and safety cars all influencing decisions in real time, strategy
            calls are made under intense pressure and uncertainty.{" "}
          </p>
          <p>
            F1 teams rely on millions of data points each lap to assist them in
            this process. But to outsiders who don’t have access to this
            information, tire strategies can seem a bit like a black box. To fix
            this, I tried breaking down the problem into the following question:
          </p>
          <div className="quote">
            How do tire strategies differ between drivers over the course of a
            race? Can historical data from a specific circuit inform future
            strategy planning?
          </div>
          <h2>Design & Technical Decisions</h2>
          <img
            src={F1Architecture}
            alt="F1 app architecture diagram"
            width="100%"
            style={{ margin: "1em 0" }}
          />
          <p>
            <span className="head">Data architecture: </span>Chose to locally
            store a CSV file over Fast F1 API calls to maximise rendering speeds
            and eliminate reliance on third-party infrastructure.
          </p>
          <p>
            <span className="head">UI choices: </span>Stacked bar charts
            effectively visualised the part-to-whole relationship between tire
            stints across an entire race.
          </p>
          <p>
            <span className="head">UX logic: </span>F1 races follow a
            temporal-first mental model, where races are listed as ‘2024 Spanish
            Grand Prix’ rather than the other way round. This influenced filter
            placement to enhance usability clarity.
          </p>
          <h2>Final Output</h2>
          <p>
            The result is a fully interactive dashboard that empowers users to
            explore how F1 tire strategies unfold across seasons and circuits.
            Users can filter by year and Grand Prix to load a stacked bar graph
            visualizing each driver’s stint strategy, complete with weather
            conditions, and circuit metadata.
          </p>
          <img
            src={F1Demo}
            alt="F1 app demo video"
            width="100%"
            style={{ margin: "1em 0" }}
          />
          <p>
            Each component in the interface was purpose-built to deliver
            information with clarity, precision, and visual hierarchy. Data from
            the CSV backend was normalized and parsed into structured formats
            that allowed each UI element to dynamically reflect race-specific
            context. Key areas of focus for me were microinteractions,
            responsive behavior, and visualisation suitability.
          </p>
          <img
            src={F1Components}
            alt="F1 app component library"
            width="100%"
            style={{ margin: "2em 0" }}
          />
          <h2>Takeaways & Future Improvements</h2>
          <p>
            This project brought together my interests in motorsport, data
            storytelling, and interaction design to solve a niche but meaningful
            problem: making tire strategy in F1 more understandable and
            explorable. By visualizing tire stints across circuits and seasons,
            this dashboard:
          </p>
          <ul>
            <li>
              Demystifies race strategy for casual fans who often miss the
              nuance behind pit stops and compound choices.
            </li>
            <li>
              Supports pattern recognition by allowing users to compare how
              strategies evolve track-to-track and year-over-year.
            </li>
            <li>
              Builds a foundation for predictive analysis, where historical
              behavior could inform likely strategies for upcoming races.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
