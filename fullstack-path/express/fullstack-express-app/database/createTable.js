import dbConnection from "./DB_CONSTS.js";

async function createTable() {
  const db = await dbConnection();

  await db.exec(`CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);`);

  await db.close();
  console.log("Database created");
}

await createTable();
