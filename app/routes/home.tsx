import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";
import "../app.css";
import Landing from "../pages/landing";
import Footer from "~/components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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
