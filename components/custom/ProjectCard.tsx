import Image, { StaticImageData } from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  imgUrl: StaticImageData;
  link: string;
};

export const ProjectCard = ({
  title,
  description,
  techStack,
  imgUrl,
  link,
}: ProjectCardProps) => {
  return (
    <div className="w-full">
      <Link
        href={link}
        className="flex flex-col gap-6 rounded-lg border-[0.33px] p-6 shadow-lg"
        target="_blank"
      >
        <div className="relative w-10 h-10">
          <Image src={imgUrl} alt={title} fill className="relative" />
        </div>
        <div>
          <h3 className="text-xl font-medium pb-2">{title}</h3>
          <p className="w-[90%] pb-5">{description}</p>
          <div className="flex flex-row gap-2">
            {techStack.length < 3
              ? techStack.map((tech) => (
                  <Badge variant={`outline`} key={tech}>
                    {tech}
                  </Badge>
                ))
              : techStack.slice(0, 2).map((tech) => (
                  <Badge variant={`outline`} key={tech}>
                    {tech}
                  </Badge>
                ))}
            {techStack.length > 3 && (
              <Badge variant="secondary">{`+${techStack.length - 2}`}</Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
