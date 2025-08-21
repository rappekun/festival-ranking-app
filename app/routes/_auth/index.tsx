import Header from "./_components/header";

import type { FC } from "react";

const Games = ["Shooting", "Wanage", "Superball"] as const;

const Index: FC = () => {
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-14">
				<h1 className="text-center font-bold text-5xl text-white">Games</h1>
			</div>
			<main className="container mx-auto max-w-5xl py-10">
				<div className="grid grid-cols-3 gap-x-10">
					{Games.map(game => (
						<div
							key={game}
							className="rounded px-2 py-20 shadow ring ring-gray-300"
						>
							<h2 className="text-center font-bold text-3xl">{game}</h2>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Index;
