import type { FC } from "react";
import { Form, useActionData } from "react-router";
import db from "~/db";
import { results } from "~/db/schema";
import Header from "./_components/header";
import type { Route } from "./+types";

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const nickname = formData.get("nickname") as string;
	const schoolType = formData.get("school_type") as string;
	const grade = formData.get("grade") as string;
	const classNumber = formData.get("class") as string;
	const number = formData.get("number") as string;
	const wanageScore = formData.get("wanage_score") as string;
	const shootingScore = formData.get("shooting_score") as string;
	const superballScore = formData.get("superball_score") as string;

	if (
		!nickname ||
		!schoolType ||
		!grade ||
		!classNumber ||
		!number ||
		!wanageScore ||
		!shootingScore ||
		!superballScore
	) {
		return { success: false, message: "All fields are required" };
	}

	const newResult = {
		nickname,
		school_type: Number(schoolType),
		grade: parseInt(grade, 10),
		class: parseInt(classNumber, 10),
		number: parseInt(number, 10),
		wanage_score: parseInt(wanageScore, 10),
		shooting_score: parseInt(shootingScore, 10),
		superball_score: parseInt(superballScore, 10),
	} satisfies typeof results.$inferInsert;
	try {
		await db.insert(results).values(newResult);
		return { success: true, message: "Registration successful!" };
	} catch (error) {
		console.error("Error inserting new result:", error);
		return { success: false, message: "Failed to register. Please try again." };
	}
};

const Register: FC = () => {
	const actionData = useActionData<typeof action>();
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-14">
				<h1 className="text-center text-6xl font-bold text-white">Register</h1>
			</div>
			<main className="container mx-auto py-10">
				<Form method="post" className="max-w-md mx-auto" replace>
					<p className="text-center text-red-500 mb-4">
						Please fill out the form below to register your scores.
					</p>
					{actionData?.message && (
						<p
							className={`text-center ${actionData.success ? "text-gray-500" : "text-red-500"} mb-6`}
						>
							{actionData.message}
						</p>
					)}
					<input
						type="text"
						name="nickname"
						placeholder="Nickname"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
					/>
					<select
						name="school_type"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
					>
						<option value="1">中学校</option>
						<option value="2">高校</option>
					</select>
					<input
						type="number"
						name="grade"
						placeholder="Grade"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						min={1}
						max={3}
					/>
					<input
						type="number"
						name="class"
						placeholder="Class"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
						min={1}
						max={6}
					/>
					<input
						type="number"
						name="number"
						placeholder="Number"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
						min={1}
						max={45}
					/>
					<input
						name="wanage_score"
						type="number"
						placeholder="Wanage Score"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
						min={0}
					/>
					<input
						name="shooting_score"
						type="number"
						placeholder="Shooting Score"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
						min={0}
					/>
					<input
						name="superball_score"
						type="number"
						placeholder="Superball Score"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						required
						min={0}
					/>
					<button
						type="submit"
						className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 cursor-pointer"
					>
						Register
					</button>
				</Form>
			</main>
		</>
	);
};

export default Register;
