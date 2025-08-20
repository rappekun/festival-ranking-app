CREATE TABLE "results" (
	"id" serial PRIMARY KEY NOT NULL,
	"nick_name" text NOT NULL,
	"school_type" integer,
	"grade" integer,
	"class" integer,
	"number" integer,
	"superball_score" integer NOT NULL,
	"wanage_score" integer NOT NULL,
	"shooting_score" integer NOT NULL,
	"total_score" integer GENERATED ALWAYS AS ("results"."superball_score" + "results"."wanage_score" + "results"."shooting_score") STORED NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
