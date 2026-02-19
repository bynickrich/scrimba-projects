import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function dbConnection() {
  return await open({
    filename: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "database.sqlite",
    ),
    driver: sqlite3.Database,
  });
}

export default dbConnection;
