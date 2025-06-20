import headshot from "../assets/headshot.webp";

export default function About() {
  return (
    <div id="about">
      <div className="caption uppercase">vedeesh18@gmail.com</div>
      <div id="headshot">
        <img
          src={headshot}
          alt="Vedeesh Bali in Amsterdam, Netherlands."
          style={{
            width: "300px",
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div className="caption lowercase">That's me in Amsterdam!</div>
      </div>
      <div className="caption uppercase" id="location">
        <div>London, United Kingdom</div>
        <div>Date</div>
        <div>Time</div>
      </div>
    </div>
  );
}
