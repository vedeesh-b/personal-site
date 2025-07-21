import type { ReactNode } from "react";
import "./components.css";
import { useViewport } from "~/context/ViewportContext";

type SocialLinkType = {
  label: string;
  href: string;
  icon: string;
}[];

export default function Footer() {
  const socialLinks: SocialLinkType = [
    {
      label: "Email",
      href: "mailto:vedeesh18@gmail.com",
      icon: "las la-at",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vedeesh-bali/",
      icon: "lab la-linkedin",
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/vedeeshb",
      icon: "lab la-dribbble",
    },
  ];

  const device = useViewport();

  return (
    <div className="caption" id="footer-container">
      <div>© VEDEESH BALI, 2025</div>
      <div id="links">
        {socialLinks.map((social, key) => (
          <a href={social.href} key={key} target="_blank">
            {device.isMobileOrTablet ? (
              <i className={social.icon} />
            ) : (
              social.label
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
