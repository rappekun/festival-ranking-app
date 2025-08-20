import {
	index,
	layout,
	prefix,
	route,
	type RouteConfig,
} from "@react-router/dev/routes";

export default [
	layout("routes/_auth/layout.tsx", [
		index("routes/_auth/index.tsx"),
		route("manage", "routes/_auth/manage.tsx"),
		...prefix("ranking", [
			index("routes/_auth/ranking/index.tsx"),
			route("shooting", "routes/_auth/ranking/shooting.tsx"),
			route("superball", "routes/_auth/ranking/superball.tsx"),
			route("wanage", "routes/_auth/ranking/wanage.tsx"),
		]),
	]),
	route("login", "routes/login.tsx"),
] satisfies RouteConfig;
