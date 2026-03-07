import { Badge } from "../ui/badge";

export const ProjectCard = () => {
  return (
    <div className="flex flex-col gap-8 rounded-md border-[0.33px] p-6">
      <div className="w-12 h-12 aspect-square rounded-lg border-[0.33px]" />
      <div>
        <h3 className="text-xl font-medium pb-2">GridLock</h3>
        <p className="w-[80%] pb-6">
          Unearthing the controversy around Duolingo’s product, despite arguably
          brilliant UX.
        </p>
        <div className="flex flex-row gap-2">
          <Badge variant={`outline`}>React</Badge>
          <Badge variant={`outline`}>Postgres</Badge>
          <Badge variant={`outline`}>+3</Badge>
        </div>
      </div>
    </div>
  );
};
