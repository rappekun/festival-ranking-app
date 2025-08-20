import type { FC } from "react";
import Header from "./_components/header";

const Index: FC = () => {
	return (
		<>
			<Header />
			<div className="bg-gradient-to-tr from-violet-500 to-pink-400 py-14">
				<h1 className="text-center text-6xl font-bold text-white">Welcome!</h1>
			</div>
			<main className="container mx-auto py-10">
				<p className="text-center text-xl">
					This is the Festival Ranking App. Please go to the page your device is
					appropriate for.
				</p>
			</main>
		</>
	);
};

export default Index;
