import { ProjectCard } from "@/components/custom/ProjectCard";

export default function Projects() {
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <h1 className="text-2xl pb-2 font-medium w-full text-start">Projects</h1>
      <ProjectCard />
    </div>
  );
}
