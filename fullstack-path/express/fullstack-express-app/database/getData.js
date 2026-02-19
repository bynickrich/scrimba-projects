import dbConnection from "./DB_CONSTS.js";

async function getData() {
  const db = await dbConnection();

  try {
    const query = `SELECT * FROM products WHERE artist = ?`;
    const params = ["The Clouds"];
    const products = await db.all(query, params);
    console.log(products);
  } catch (e) {
    console.log(e);
  }
}

await getData();
