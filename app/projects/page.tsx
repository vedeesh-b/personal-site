import { ProjectCard } from "@/components/custom/ProjectCard";
import gridlockIcon from "@/assets/gridlock-icon.png";

export default function Projects() {
  return (
    <div className="py-30 flex flex-col items-center gap-8 text-start">
      <div>
        <h1 className="text-2xl pb-2 font-medium w-full text-start">
          Projects
        </h1>
        <p>
          I'm still working on how I want to display this section. While that's
          in the works, check out what I'm currently building.
        </p>
      </div>
      <ProjectCard
        title="GridLock"
        description="F1-themed bingo card web app."
        techStack={["React", "Postgres", "NextJS", "Vercel"]}
        imgUrl={gridlockIcon}
        link="https://f1-gridlock.vercel.app/"
      />
    </div>
  );
}
