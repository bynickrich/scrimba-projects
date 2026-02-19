import dbConnection from "./DB_CONSTS.js";
import { vinyl } from "../data.js";

async function seedTable() {
  const db = await dbConnection();

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `INSERT INTO products (title, artist, price, image, year, genre, stock) VALUES (?,?,?,?,?,?,?)`,
        [title, artist, price, image, year, genre, stock],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (e) {
    await db.exec("ROLLBACK");
    console.error(e);
  } finally {
    await db.close();
    console.log("Connection closed");
  }
}

await seedTable();
