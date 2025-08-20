import bcrypt from "bcryptjs";
import { getSession } from "~/session.server";

const correctPassword = process.env.PASSWORD as string;

export const getSessionStorage = async (request: Request) => {
	return await getSession(request.headers.get("cookie"));
};

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const checkPassword = async (hash: string) => {
	const match = await bcrypt.compare(correctPassword, hash);
	return match;
};
