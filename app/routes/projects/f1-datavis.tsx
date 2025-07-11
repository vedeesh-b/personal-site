import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import F1Splash from "../../assets/f1_splash.png";

export default function F1Datavis() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>F1 TireStrats</h1>
          <img src={F1Splash} alt="F1 TireStrats splash image" />
        </div>
      </div>
      <Footer />
    </>
  );
}
