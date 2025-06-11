import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("forgotpassword", "routes/forgotpassword.tsx"),
] satisfies RouteConfig;
