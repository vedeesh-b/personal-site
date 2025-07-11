import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects/index.tsx"),
  route("projects/synapse-vr", "routes/projects/synapsevr.tsx"),
  route("projects/f1-tirestrats", "routes/projects/f1-datavis.tsx"),
  route("projects/aac", "routes/projects/aac.tsx"),
] satisfies RouteConfig;
