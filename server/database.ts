import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create the connection for local PostgreSQL
const sql = postgres(process.env.DATABASE_URL);

// Create the database instance with schema
export const db = drizzle(sql, { schema });

export type Database = typeof db;
