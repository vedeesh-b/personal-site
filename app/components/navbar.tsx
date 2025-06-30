import "./components.css";

export default function Navbar() {
  const navbarLinks = [
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Projects',
      path: '/projects'
    }
  ];
  return (
    <div id="navbar-container">
      <div id="headshot-img">Logo</div>
      <div id="links">
        {navbarLinks.map((link, key) => (
          <div className={`${link.title}-link`} key={key}>
            <a href={link.path}>
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
