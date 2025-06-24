import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects/index.tsx", [
    route("synapse-vr", "routes/projects/synapsevr.tsx"),
    route("f1-datavis", "routes/projects/f1-datavis.tsx"),
    route("aac", "routes/projects/aac.tsx"),
  ]),
  route("about", "routes/about.tsx")
] satisfies RouteConfig;
