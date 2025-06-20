import "./components.css";

export default function Navbar() {
  const navbarLinks = ["About", "Work"];
  return (
    <div id="navbar-container">
      <div id="headshot-img">Logo</div>
      <div id="links">
        {navbarLinks.map((link, key) => (
          <div className={`${link}-link`} key={key}>
            {link}
          </div>
        ))}
      </div>
    </div>
  );
}
