"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import gmailIcon from "@/assets/socials/icons8-gmail-144.png";
import githubIcon from "@/assets/socials/icons8-git-144.png";
import linkedinIcon from "@/assets/socials/icons8-linkedin-144.png";

import { useMediaQuery } from "react-responsive";

type SocialProps = {
  icon: StaticImageData;
  href: string;
  name: string;
  shortName: string;
};

const MobileSocial = ({ icon, href, name }: SocialProps) => {
  return (
    <Link
      href={href}
      className="flex aspect-square items-center justify-center border-[0.33px] rounded-md"
    >
      <Image src={icon} alt={name} height={48} width={48} />
    </Link>
  );
};

const DesktopSocial = ({ icon, name, href, shortName }: SocialProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex aspect-square border-[0.33px] rounded-md hover:bg-neutral-50 transition-colors"
    >
      <div className="h-full w-full flex flex-col justify-between p-6">
        <div>
          <Image src={icon} alt={name} height={32} width={32} />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-[24px] font-medium">{name}</div>
          <div className="text-muted-foreground">{shortName}</div>
        </div>
      </div>
    </Link>
  );
};

export const SocialsCard = () => {
  const socials = [
    {
      link: "mailto:vedeesh18@gmail.com",
      icon: gmailIcon,
      name: "Email",
      shortName: "vedeesh18@gmail.com",
    },
    {
      link: "https://github.com/vedeesh-b",
      icon: githubIcon,
      name: "GitHub",
      shortName: "/vedeesh-b",
    },
    {
      link: "https://www.linkedin.com/in/vedeesh-bali/`",
      icon: linkedinIcon,
      name: "LinkedIn",
      shortName: "/vedeesh-bali",
    },
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="w-full pb-30">
      <div className="w-full text-start font-medium pb-4">Reaching Out</div>
      <div className="w-full grid grid-cols-3 border-[0.33px] gap-2 rounded-xl p-2">
        {socials.map((social) =>
          isMobile ? (
            <MobileSocial
              key={social.name}
              href={social.link}
              icon={social.icon}
              name={social.name}
              shortName={social.shortName}
            />
          ) : (
            <DesktopSocial
              key={social.name}
              href={social.link}
              icon={social.icon}
              name={social.name}
              shortName={social.shortName}
            />
          ),
        )}
      </div>
    </div>
  );
};
