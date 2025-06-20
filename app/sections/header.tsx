export default function Header() {
  return (
    <div id="header">
      <h1>
        I’m{" "}
        <span
          style={{ fontWeight: 600, fontStyle: "italic", color: "#262626" }}
        >
          Vedeesh
        </span>
        , a front-end engineer <i className="lab la-react" /> and designer{" "}
        <i className="las la-pencil-ruler" /> specialising in clean and
        web-friendly product experiences.
      </h1>
    </div>
  );
}
