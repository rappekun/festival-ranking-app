import { desc } from "drizzle-orm";
import { useLoaderData } from "react-router";

import db from "~/db";
import { results } from "~/db/schema";
import Header from "../_components/header";
import GameSelector from "./_components/game-selector";
import RankingList from "./_components/ranking-list";

import type { FC } from "react";

export const loader = async () => {
	const data = await db
		.select()
		.from(results)
		.orderBy(desc(results.superball_score))
		.limit(10);
	return data;
};

const SuperBallRanking: FC = () => {
	const data = useLoaderData<typeof loader>();
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-6">
				<h1 className="text-center font-bold text-4xl text-white">
					Ranking - SuperBall
				</h1>
			</div>
			<main className="container mx-auto py-10">
				<GameSelector />
				<div className="mx-auto max-w-5xl rounded-2xl px-4 py-2 shadow-lg">
					<h2 className="bg-gradient-to-r from-yellow-500 to-red-400 bg-clip-text py-6 text-center font-bold text-3xl text-transparent">
						Top 10 Rankings
					</h2>
					<div className="flex">
						{data.length > 3 ? (
							<>
								<div className="flex w-1/2 flex-col space-y-4">
									<RankingList data={data.slice(0, 3)} score />
								</div>
								<div className="flex w-1/2 flex-col space-y-4">
									<RankingList data={data.slice(3)} shift={3} />
								</div>
							</>
						) : (
							<div className="flex flex-col space-y-4">
								<RankingList data={data} score />
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default SuperBallRanking;
