import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export default function F1Datavis() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>F1 TireStrats</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
