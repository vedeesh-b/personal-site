import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import tech_stack from "../../assets/icon_stack.png";
import timeline from "../../assets/icon_timeline.png";
import contributions from "../../assets/icon_contributions.png";
import SynapseSplash from "../../assets/SynapseSplash.png";
import CardGroup from "~/components/cardGroup";
import Research from "../../assets/Research.png";
import Storyboard from "../../assets/storyboard.jpeg";
import SynapseComponents from "../../assets/Synapse_Components.png";

export default function SynapseVR() {
  const cardGroupData = [
    {
      src: tech_stack,
      title: "Tech Stack",
      description: "Figma, Mural, Spline3D",
      icon_background: "#afcaff",
    },
    {
      src: timeline,
      title: "Timeline",
      description: "6 months [01/2024 - 06/2024]",
      icon_background: "#ffd0af",
    },
    {
      src: contributions,
      title: "Contributions",
      description: "User research, interface design, UI testing",
      icon_background: "#ffafe2",
    },
  ];
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 className="project-title">synapseVR</h1>
          <img
            src={SynapseSplash}
            alt="SynapseVR splash image"
            width="100%"
            className="splash-img"
          />
          <CardGroup data={cardGroupData} />
          <h2>Context</h2>
          <p>
            At bp, one of my project teams was working in the virtual reality
            space. As a software engineer, I needed to expand my programming
            abilities to the realm of three dimensions; specifically, Blender
            and Unity. The familiar interfaces of 2D software gave way to
            complex 3D navigation, unfamiliar terminology, and a whole new way
            of thinking spatially. It was like learning a new language, with a
            steep learning curve.
          </p>
          <p>
            I attempted to conquer this hurdle by diving deep into the available
            online resources - YouTube videos, online courses, and blogposts.
            While these were valuable and ultimately did help me reach my goal,
            they also shared a common limitation: they were also inherently
            two-dimensional.
          </p>
          <p>
            With the advent of augmented reality (AR) and virtual reality (VR),
            I thought about exploring AI e-learning technologies that could
            bridge the gap between theory and practical applications of 3D
            design education.
          </p>
          <h2>Approach</h2>
          <p>
            The key to this solution lay in understanding users’ attitudes
            towards e-learning platforms and their own learning habits.
            Interviews were conducted with the primary objective of
            understanding people’s perceptions, needs, and concerns around using
            AI tools for the purpose of upskilling and development.
          </p>
          <img
            src={Research}
            alt="User research for thoughts on VR and AI education"
            width="100%"
            style={{ margin: "1em 0" }}
          />
          <p>
            Determining the root causes behind the insights collected from users
            was crucial for the creation of a problem statement. To ensure that
            this statement matched the initial focus on learning opportunities
            in the 3D development and design space, it was targeted towards
            engineers and designers who wanted to expand their skill set into
            such tools:
          </p>
          <div className="quote">
            Designers and developers lack access to interactive and engaging
            learning materials when they are trying to expand their skill set
            into 3D technologies. This hinders their ability to quickly and
            effectively utilise AI for up-skilling purposes across a variety of
            roles.
          </div>
          <h2>Ideation & Design</h2>
          <img
            src={Storyboard}
            alt="Storyboard highlighting end-user interaction with e-learning product"
            width="100%"
            style={{ margin: "1em 0" }}
          />
          <img
            src={SynapseComponents}
            alt="Component library for the product featuring banners, course cards, and personal dashboards"
            width="100%"
            style={{ margin: "1em 0" }}
          />
          <h2>Final Output</h2>
          <iframe
            width="100%"
            height="600px"
            style={{ border: 0 }}
            src="https://embed.figma.com/proto/tv6Xw0QbdP5tLpVDEfBdey/AI-Education-Prototypes?node-id=208-193&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=208%3A193&show-proto-sidebar=1&embed-host=share&hide-ui=1"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
}
