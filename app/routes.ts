import {
    type RouteConfig,
    route,
    layout,
    index,
    prefix,
} from "@react-router/dev/routes";

export default [
    layout("./layout/default.tsx", [
        index("./routes/events.tsx"),
    ]),
] satisfies RouteConfig;
