import { Link } from "react-router";

import type { FC } from "react";

const Links = [
	{
		label: "Ranking",
		to: "/ranking",
	},
	{
		label: "Manage",
		to: "/manage",
	},
];

const Header: FC = () => {
	return (
		<header>
			<div className="flex items-center justify-between bg-white px-10 py-4 shadow-md">
				<Link to="/">
					<h1 className="font-bold text-2xl text-black">Ranking App</h1>
				</Link>
				<nav>
					<ul className="flex space-x-10">
						{Links.map(link => (
							<li key={link.to}>
								<Link
									to={link.to}
									className="rounded px-6 py-2 text-gray-800 duration-150 hover:bg-gray-200 hover:shadow"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
