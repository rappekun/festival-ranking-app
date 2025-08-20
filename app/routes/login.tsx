import type { FC } from "react";
import {
	type ActionFunction,
	Form,
	redirect,
	useActionData,
} from "react-router";
import { checkPassword, getSessionStorage, hashPassword } from "~/libs/auth";
import { commitSession } from "~/session.server";

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
			<h1 className="mb-4 text-2xl font-bold">Login to Festival Ranking App</h1>
			<p className="mb-4 text-red-500 inline-block">
				{action?.errors?.message && action.errors.message}
			</p>
			<input
				type="password"
				name="password"
				className="w-sm border border-gray-500 p-2 outline-none rounded focus:border-blue-500 duration-150"
				placeholder="Password"
			/>
			<button
				className="mt-4 w-sm py-2 bg-blue-500 hover:bg-blue-700 cursor-pointer duration-150 text-white rounded"
				type="submit"
			>
				認証
			</button>
		</Form>
	);
};

export default Login;
