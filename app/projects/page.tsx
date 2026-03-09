import { ProjectCard } from "@/components/custom/ProjectCard";
import gridlockIcon from "@/assets/gridlock-icon.png";

export default function Projects() {
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <h1 className="text-2xl pb-2 font-medium w-full text-start">Projects</h1>
      <ProjectCard
        title="GridLock"
        description="An F1-themed bingo card application with user authentication, prediction tracking, and voting mechanisms."
        techStack={["React", "Postgres", "NextJS"]}
        imgUrl={gridlockIcon}
      />
    </div>
  );
}
