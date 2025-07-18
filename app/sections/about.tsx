import { useEffect, useState } from "react";
import headshot from "../assets/headshot.webp";

export default function About() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
  );
  const [date, setDate] = useState<Date>(now);

  function updateDate() {
    let newDate = new Date();
    setDate(newDate);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="about">
      <div className="caption uppercase">vedeesh18@gmail.com</div>
      <div id="headshot">
        <img
          src={headshot}
          alt="Vedeesh Bali in Amsterdam, Netherlands."
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div className="caption lowercase">That's me in Amsterdam!</div>
      </div>
      <div className="caption uppercase" id="location">
        <div>London, United Kingdom</div>
        <div id="date">{date.toDateString()}</div>
        <div id="time">{date.toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
