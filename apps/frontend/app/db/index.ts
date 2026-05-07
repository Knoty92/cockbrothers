import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Connection pooling — use DATABASE_URL from env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create the postgres client with connection pooling
const client = postgres(connectionString, {
  max: 10, // max pool connections
  idle_timeout: 30, // seconds
  connect_timeout: 10, // seconds
  prepare: true,
});

// Create the drizzle instance with schema
export const db = drizzle(client, { schema });

// Helper to get a fresh query client for one-off operations
export function createDbClient(url?: string) {
  const conn = postgres(url ?? connectionString, {
    max: 1,
    idle_timeout: 5,
  });
  return drizzle(conn, { schema });
}

// Export schema for convenience
export { schema };
