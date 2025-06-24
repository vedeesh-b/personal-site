import "../app.css";
import Header from "~/sections/header";
import About from "~/sections/about";
import CurrentProject from "~/sections/currentProject";

export default function Landing() {
  return (
    <>
      <div id="landing-section">
        <Header />
        <About />
        <CurrentProject />
      </div>
    </>
  );
}
