import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET],
		secure: import.meta.env.PROD,
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
