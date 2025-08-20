import type { FC } from "react";
import { type LoaderFunction, Outlet, redirect } from "react-router";
import { checkPassword, getSessionStorage } from "~/libs/auth";
import { destroySession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSessionStorage(request);
	const token = session.get("token");

	if (!token) return redirect("/login");
	if (!(await checkPassword(token)))
		return redirect("/login", {
			headers: { "Set-Cookie": await destroySession(session) },
		});

	return true;
};

const Authed: FC = () => {
	return <Outlet />;
};

export default Authed;
