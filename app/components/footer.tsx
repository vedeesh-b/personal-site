import "./components.css";

type SocialLinkType = {
  label: string;
  href: string;
}[];

export default function Footer() {
  const socialLinks: SocialLinkType = [
    {
      label: "Email",
      href: "mailto:vedeesh18@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vedeesh-bali/",
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/vedeeshb",
    },
  ];

  return (
    <div className="caption" id="footer-container">
      <div>© VEDEESH BALI, 2025</div>
      <div id="links footer">
        {socialLinks.map((social, key) => (
          <a href={social.href} key={key} target="_blank">
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
