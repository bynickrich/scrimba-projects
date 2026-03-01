import dbConnection from "../database/DB_CONSTS.js";
export async function getCurrentUser(req, res) {
  let db;
  try {
    db = await dbConnection();

    if (!req.session.userId) {
      return res.json({ isLoggedIn: false });
    }

    const user = await db.get(`SELECT name FROM users WHERE id = ?`, [
      req.session.userId,
    ]);

    res.json({ isLoggedIn: true, name: user.name });
  } catch (e) {
    console.error("getCurrentUser error:", e);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (db) await db.close();
  }
}
