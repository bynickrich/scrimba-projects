import dbConnection from "../database/DB_CONSTS.js";

export async function getGenres(_, res) {
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
  try {
    const db = await dbConnection();

    let query = `SELECT * FROM products`;
    const params = []

    if (req.query.genre) {
      query+= ` WHERE genre = ?`
      params.push(req.query.genre);
    }

    if (req.query.search) {
      query += ` WHERE (title LIKE ? OR artist LIKE ? OR genre LIKE ?)`;
      const search = `%${req.query.search}%`;
      params.push(search, search, search);
    }

    const data = await db.all(query, params);
    return res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products", details: e });
  }
}
