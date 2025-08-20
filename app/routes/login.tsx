import {
	type ActionFunction,
	Form,
	redirect,
	useActionData,
} from "react-router";

import { checkPassword, getSessionStorage, hashPassword } from "~/libs/auth";
import { commitSession } from "~/session.server";

import type { FC } from "react";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const password = formData.get("password") as string;
	if (!password) return { errors: { message: "Password is required" } };

	const hashedPassword = await hashPassword(password);
	if (!hashedPassword)
		return { errors: { message: "Failed to process password" } };
	if (!(await checkPassword(hashedPassword)))
		return { errors: { message: "Invalid password" } };

	const session = await getSessionStorage(request);
	session.set("token", hashedPassword);
	return redirect("/", {
		headers: { "Set-Cookie": await commitSession(session) },
	});
};

const Login: FC = () => {
	const action = useActionData();
	return (
		<Form
			method="POST"
			replace
			className="flex h-screen flex-col items-center justify-center"
		>
			<h1 className="mb-4 font-bold text-2xl">Login to Festival Ranking App</h1>
			<p className="mb-4 inline-block text-red-500">
				{action?.errors?.message && action.errors.message}
			</p>
			<input
				type="password"
				name="password"
				className="w-sm rounded border border-gray-500 p-2 outline-none duration-150 focus:border-blue-500"
				placeholder="Password"
			/>
			<button
				className="mt-4 w-sm cursor-pointer rounded bg-blue-500 py-2 text-white duration-150 hover:bg-blue-700"
				type="submit"
			>
				認証
			</button>
		</Form>
	);
};

export default Login;
