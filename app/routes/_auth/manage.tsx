import { NativeSelect, NumberInput, TextInput } from "@mantine/core";
import { Form, useActionData } from "react-router";

import db from "~/db";
import { results } from "~/db/schema";
import Header from "./_components/header";

import type { FC } from "react";
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

const Manage: FC = () => {
	const actionData = useActionData<typeof action>();
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-6">
				<h1 className="text-center font-bold text-4xl text-white">Manage</h1>
			</div>
			<main className="container mx-auto py-10">
				<Form method="post" className="mx-auto max-w-xl" replace>
					<h2 className="text-center font-bold text-2xl">登録</h2>
					{actionData?.message && (
						<p
							className={`text-center ${actionData.success ? "text-gray-500" : "text-red-500"} mb-6`}
						>
							{actionData.message}
						</p>
					)}
					<TextInput name="nickname" label="ニックネーム" required pb={16} />
					<NativeSelect
						name="school_type"
						label="学校種別"
						pb={24}
						required
						data={[
							{ label: "中学校", value: "1" },
							{ label: "高校", value: "2" },
						]}
					></NativeSelect>

					<p>学籍情報</p>
					<div className="flex gap-x-3 pb-6">
						<NumberInput label="学年" name="grade" required min={1} max={3} />
						<NumberInput label="クラス" name="class" required min={1} max={6} />
						<NumberInput label="番号" name="number" required min={1} max={45} />
					</div>

					<p>スコア</p>
					<div className="flex gap-x-3 pb-6">
						<NumberInput name="wanage_score" label="輪投げ" required min={0} />
						<NumberInput name="shooting_score" label="射的" required min={0} />
						<NumberInput
							name="superball_score"
							label="スーパーボール"
							required
							min={0}
						/>
					</div>
					<button
						type="submit"
						className="w-full cursor-pointer rounded bg-blue-500 p-2 text-white transition duration-150 hover:bg-blue-600"
					>
						Register
					</button>
				</Form>
			</main>
		</>
	);
};

export default Manage;
