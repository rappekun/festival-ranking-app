import db from "~/db";
import { results } from "~/db/schema";
import Header from "../_components/header";
import RankingList from "./_components/ranking-list";

import type { FC } from "react";

export const loader = async () => {
	const data = await db
		.select()
		.from(results)
		.orderBy(desc(results.total_score))
		.limit(10);
	return data;
};

const Ranking: FC = () => {
	const data = useLoaderData<typeof loader>();
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-6">
				<h1 className="text-center font-bold text-4xl text-white">
					Ranking - Total
				</h1>
			</div>
			<main className="container mx-auto py-10">
				<div>
					<nav className="mb-6 flex list-none justify-center space-x-10 pl-5">
						<li>
							<Link
								to="/ranking/shooting"
								className="text-blue-500 hover:underline"
							>
								Shooting
							</Link>
						</li>
						<li>
							<Link
								to="/ranking/wanage"
								className="text-blue-500 hover:underline"
							>
								Wanage
							</Link>
						</li>
						<li>
							<Link
								to="/ranking/superball"
								className="text-blue-500 hover:underline"
							>
								Superball
							</Link>
						</li>
					</nav>
				</div>
				<div className="rounded-2xl py-2 shadow-lg ring ring-gray-300">
					<h2 className="bg-gradient-to-r from-violet-500 to-red-400 bg-clip-text py-6 text-center font-bold text-3xl text-transparent">
						Top 10 Rankings
					</h2>
					<div className="flex flex-col space-y-4">
						{data.length > 3 ? (
							<RankingList data={data} />
						) : (
							<p>No rankings available</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Ranking;
