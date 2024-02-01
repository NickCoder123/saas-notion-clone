import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log("🔴 Cannot find database URL");
}

const client = postgres(connectionString as string, { max: 1 });
const db = drizzle(client, { schema });

const migrateDb = async () => {
  try {
    console.log("🟡 Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Successfully migrated");
  } catch (error) {
    console.log("🔴 Error migrating client");
  }
};

migrateDb();

export default db;
