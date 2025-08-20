import { desc } from "drizzle-orm";
import type { FC } from "react";
import { Link, useLoaderData } from "react-router";
import db from "~/db";
import { results } from "~/db/schema";
import CrownIcon from "../_components/crown";
import Header from "../_components/header";

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
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-14">
				<h1 className="text-center text-6xl font-bold text-white">
					Ranking - Total
				</h1>
			</div>
			<main className="container mx-auto py-10">
				<div>
					<nav className="list-none pl-5 flex space-x-10 justify-center mb-6">
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
				<div className="rounded-2xl ring ring-blue-600 py-2 shadow-lg">
					<h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-red-400 py-6">
						Top 10 Rankings
					</h2>
					<div className="flex flex-col space-y-4">
						{data.map((item, index) => (
							<div key={item.id.toString()}>
								{index ? (
									<hr className="border-gray-500 w-[97.5%] mx-auto mb-4" />
								) : null}
								<div className="flex flex-row items-center">
									<div className="flex items-center justify-center w-64">
										{
											<CrownIcon
												fill={
													index === 0
														? "gold"
														: index === 1
															? "silver"
															: index === 2
																? "bronze"
																: "gray"
												}
												className="size-16 mr-2"
											/>
										}
										<span className="text-5xl font-bold text-gray-800 ml-2">
											No.{index + 1}
										</span>
									</div>
									<div key={item.id} className="py-4 px-6">
										<h2 className="text-2xl font-bold text-gray-800">
											{item.nickname} - {item.school_type === 1 ? "中" : "高"}
											{item.grade}-{item.class}-{item.number}
										</h2>
										<div className="flex space-x-10 mt-2">
											<span className="text-lg text-gray-600">
												Shooting Score: {item.shooting_score}
											</span>
											<span className="text-lg text-gray-600">
												Wanage Score: {item.wanage_score}
											</span>
											<span className="text-lg text-gray-600">
												Superball Score: {item.superball_score}
											</span>
										</div>
										<p className="text-2xl text-gray-600">
											Total Score: {item.total_score}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Ranking;
