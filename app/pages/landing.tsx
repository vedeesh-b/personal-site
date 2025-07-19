import "../app.css";
import Header from "~/sections/header";
import About from "~/sections/about";

export default function Landing() {
  return (
    <>
      <div id="landing-section">
        <Header />
        <About />
      </div>
    </>
  );
}
