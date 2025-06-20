import "./components.css";

type SocialLinkType = {
  label: string;
  href: string;
}[];

export default function Footer() {
  const socialLinks: SocialLinkType = [
    {
      label: "Email",
      href: "",
    },
    {
      label: "LinkedIn",
      href: "",
    },
    {
      label: "Dribbble",
      href: "",
    },
    {
      label: "Medium",
      href: "",
    },
  ];

  return (
    <div className="caption" id="footer-container">
      <div>© VEDEESH BALI, 2025</div>
      <div id="links">
        {socialLinks.map((social, key) => (
          <a href={social.href} key={key}>
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
