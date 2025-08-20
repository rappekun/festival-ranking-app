import { Table } from "@mantine/core";

import CrownIcon from "../../_components/crown";

import type { FC } from "react";
import type { results } from "~/db/schema";

const RankingList: FC<{
	data: (typeof results.$inferSelect)[];
	className?: string;
	shift?: number;
	score?: boolean;
}> = ({ data, className, shift, score }) => {
	return (
		<div className={className}>
			{data.map((item, index) => (
				<div key={item.id.toString()}>
					<div className="flex items-center px-6">
						<div className="flex w-32 items-center justify-center">
							{
								<CrownIcon
									fill={getColor(index + 1 + (shift || 0))}
									className="mr-2 size-8"
								/>
							}
							<span className="ml-2 font-bold text-3xl text-gray-800">
								No.{index + 1 + (shift || 0)}
							</span>
						</div>
						<div key={item.id} className="px-6 py-4">
							<h2 className="pb-1 pl-1 font-bold text-2xl text-gray-800">
								{item.school_type === 1 ? "中" : "高"}
								{item.grade}-{item.class}-{item.number}　{item.nickname}
							</h2>
							{score ? (
								<Table layout="fixed">
									<Table.Thead>
										<Table.Tr>
											<Table.Th>射的</Table.Th>
											<Table.Th>輪投げ</Table.Th>
											<Table.Th>ボール</Table.Th>
											<Table.Th>合計</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>
										<Table.Tr>
											<Table.Td>{item.shooting_score}</Table.Td>
											<Table.Td>{item.wanage_score}</Table.Td>
											<Table.Td>{item.superball_score}</Table.Td>
											<Table.Td>{item.total_score}</Table.Td>
										</Table.Tr>
									</Table.Tbody>
								</Table>
							) : null}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const getColor = (index: number): string => {
	switch (index) {
		case 1:
			return "gold";
		case 2:
			return "silver";
		case 3:
			return "brown";
		default:
			return "black";
	}
};

export default RankingList;
