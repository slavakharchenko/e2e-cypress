import type { Knex } from "knex";
import knex from "knex";

let instance: Knex | null = null;

export function getDb(): Knex {
  if (!instance) {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
      throw new Error(
        "Database environment variables are not set. " +
          "Add DB_HOST, DB_USER, DB_PASSWORD, DB_NAME to your .env file.",
      );
    }

    instance = knex({
      client: "pg",
      connection: {
        host: DB_HOST,
        port: Number(DB_PORT) || 5432,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      },
    });
  }

  return instance;
}

export async function destroyDb(): Promise<void> {
  if (instance) {
    await instance.destroy();
    instance = null;
  }
}
