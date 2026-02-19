import dbConnection from "../database/DB_CONSTS.js";

export async function getGenres(req, res) {
  try {
    const db = await dbConnection();

    const query = `SELECT DISTINCT genre FROM products`;
    const data = await db.all(query);
    return res.status(200).json(data.map((item) => item.genre));
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch genres", details: e });
  }
}

export async function getProducts(req, res) {
  return res.json("products");
}
