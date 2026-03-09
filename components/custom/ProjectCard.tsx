import Image, { StaticImageData } from "next/image";
import { Badge } from "../ui/badge";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  imgUrl: StaticImageData;
};

export const ProjectCard = ({
  title,
  description,
  techStack,
  imgUrl,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col gap-8 rounded-md border-[0.33px] p-6">
      <div className="relative w-8 h-8">
        <Image src={imgUrl} alt={title} fill className="relative" />
      </div>
      <div>
        <h3 className="text-xl font-medium pb-2">{title}</h3>
        <p className="w-[90%] pb-6">{description}</p>
        <div className="flex flex-row gap-2">
          {techStack.length < 3
            ? techStack.map((tech) => (
                <Badge variant={`outline`} key={tech}>
                  {tech}
                </Badge>
              ))
            : techStack.slice(0, 3).map((tech) => (
                <Badge variant={`outline`} key={tech}>
                  {tech}
                </Badge>
              ))}
        </div>
      </div>
    </div>
  );
};
