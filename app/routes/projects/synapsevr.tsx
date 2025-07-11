import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export default function SynapseVR() {
  return (
    <>
      <Navbar />
      <div id="layout-container">
        <div className="page-container">
          <h1 style={{ textAlign: "left" }}>synapseVR</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
