import { type SQL, sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const results = pgTable("results", {
	id: serial("id").primaryKey(),
	nickname: text("nick_name").notNull(),
	school_type: integer("school_type"),
	grade: integer("grade"),
	class: integer("class"),
	number: integer("number"),
	superball_score: integer("superball_score").notNull(),
	wanage_score: integer("wanage_score").notNull(),
	shooting_score: integer("shooting_score").notNull(),
	total_score: integer("total_score")
		.notNull()
		.generatedAlwaysAs(
			(): SQL =>
				sql`${results.superball_score} + ${results.wanage_score} + ${results.shooting_score}`,
		),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
});
