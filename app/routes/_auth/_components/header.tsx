import type { FC } from "react";
import { Link } from "react-router";

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
			<div className="bg-white flex items-center justify-between px-10 py-4 shadow-md">
				<h1 className="text-black text-2xl font-bold">Ranking App</h1>
				<nav>
					<ul className="flex space-x-10">
						{Links.map((link) => (
							<li key={link.to}>
								<Link
									to={link.to}
									className="text-gray-800 py-2 px-6 rounded duration-150 hover:shadow hover:bg-gray-200"
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
