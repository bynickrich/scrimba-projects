import dbConnection from "../database/DB_CONSTS.js";

export async function getGenres(_, res) {
  let db;
  try {
    db = await dbConnection();

    const query = `SELECT DISTINCT genre FROM products`;
    const data = await db.all(query);
    return res.status(200).json(data.map((item) => item.genre));
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch genres", details: e });
  } finally {
    if (db) await db.close();
  }
}

export async function getProducts(req, res) {
  let db;
  try {
    db = await dbConnection();

    let query = `SELECT * FROM products`;
    const conditions = [];
    const params = [];

    if (req.query.genre) {
      conditions.push(`genre = ?`);
      params.push(req.query.genre);
    }

    if (req.query.search) {
      conditions.push(`(title LIKE ? OR artist LIKE ? OR genre LIKE ?)`);
      const search = `%${req.query.search}%`;
      params.push(search, search, search);
    }

    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const data = await db.all(query, params);
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products", details: e });
  } finally {
    if (db) await db.close();
  }
}
