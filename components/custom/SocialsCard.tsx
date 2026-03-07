import { GitGraph, Mail } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type SocialProps = {
  icon: ReactNode;
  href: string;
};

const Social = ({ icon, href }: SocialProps) => {
  return (
    <Link
      href={href}
      className="flex h-20 w-20 aspect-square items-center justify-center border-[0.33px] rounded-md"
    >
      {icon}
    </Link>
  );
};

export const SocialsCard = () => {
  return (
    <div className="w-full pb-30">
      <div className="w-full text-start font-medium pb-4">Reaching Out</div>
      <div className="w-full grid grid-cols-3 border-[0.33px] rounded-sm p-2">
        <Social href={`mailto:vedeesh18@gmail.com`} icon={<Mail />} />
        <Social href={`linkedin.com/in/vedeesh-bali/`} icon={<GitGraph />} />
      </div>
    </div>
  );
};
