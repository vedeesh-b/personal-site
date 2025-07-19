import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";
import "../app.css";
import Landing from "../pages/landing";
import Footer from "~/components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vedeesh Bali" },
    {
      name: "description",
      content:
        "Vedeesh Bali's personal portfolio featuring software engineering and design projects.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <Landing />
      </div>
      <Footer />
    </>
  );
}
