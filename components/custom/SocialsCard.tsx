import { GitGraph, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import gmailIcon from "@/assets/socials/icons8-gmail-144.png";
import githubIcon from "@/assets/socials/icons8-git-144.png";
import linkedinIcon from "@/assets/socials/icons8-linkedin-144.png";

type SocialProps = {
  icon: ReactNode;
  href: string;
};

const Social = ({ icon, href }: SocialProps) => {
  return (
    <Link
      href={href}
      className="flex aspect-square items-center justify-center border-[0.33px] rounded-md"
    >
      {icon}
    </Link>
  );
};

export const SocialsCard = () => {
  return (
    <div className="w-full pb-30">
      <div className="w-full text-start font-medium pb-4">Reaching Out</div>
      <div className="w-full grid grid-cols-3 border-[0.33px] gap-2 rounded-sm p-2">
        <Social
          href={`mailto:vedeesh18@gmail.com`}
          icon={<Image src={gmailIcon} alt="Gmail" height={48} width={48} />}
        />
        <Social
          href={`https://github.com/vedeesh-b`}
          icon={<Image src={githubIcon} alt="GitHub" height={48} width={48} />}
        />
        <Social
          href={`https://www.linkedin.com/in/vedeesh-bali/`}
          icon={
            <Image src={linkedinIcon} alt="Linkedin" height={48} width={48} />
          }
        />
      </div>
    </div>
  );
};
