import { Link } from "react-router";

import type { FC } from "react";

const Games = [
	{
		label: "Total",
		to: "/ranking/",
	},
	{
		label: "Shooting",
		to: "/ranking/shooting",
	},
	{
		label: "Wanage",
		to: "/ranking/wanage",
	},
	{
		label: "Superball",
		to: "/ranking/superball",
	},
] as const;

const GameSelector: FC = () => {
	return (
		<nav className="mb-6 flex list-none justify-center space-x-10 pl-5">
			{Games.map(game => (
				<li key={game.label}>
					<Link to={game.to} className="text-blue-500 hover:underline">
						{game.label}
					</Link>
				</li>
			))}
		</nav>
	);
};

export default GameSelector;
