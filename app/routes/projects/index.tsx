import { Outlet } from "react-router";
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
          <CurrentProject />
        </div>
      </div>
      <Footer />
    </>
  );
}

const projectCards = {
  layout: {
    key: 'Currently building',
    title: "P1 Dashboard",
          text: "Process behind building P1 Dashboard",
          btn: {
            text: "More info",
            href: "photos.vedeeshbali.com"
          }
  }
}