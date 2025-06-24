import Card, { type CardProps } from "~/components/card";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function About() {
  return (
    <>
        <Navbar />
        <div id="layout-container">
            <h1>About</h1>
            <div>
            
            </div>
            <div id="header">
            <div>
                <h1>Great products need clever design and effective code to inform each other. That space is where I work best.</h1>
            </div>
            </div>
        </div>
        <Footer />
    </>
  )
}