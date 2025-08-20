import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema/";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle({ client: sql, schema: schema });

export default db;
