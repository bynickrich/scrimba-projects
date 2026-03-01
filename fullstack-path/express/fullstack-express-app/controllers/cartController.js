import dbConnection from "../database/DB_CONSTS";

export async function addToCart(req, res) {
  let db;
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "You must be logged in to ad items to your cart" });
    }

    const { productId } = req.body;

    db = await dbConnection();

    const getItemDetails = await db.get(`SELECT * FROM products WHERE id = ?`, [
      productId,
    ]);

    if (!getItemDetails) {
      return res
        .status(404)
        .json({ message: "No product with that id exists" });
    }

    const checkCart = await db.get(
      `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`,
      [req.session.userId, productId],
    );

    if (!checkCart) {
      await db.run(
        `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?) `,
        [req.session.userId, productId, 1],
      );
      return res.status(201).json({ message: "Added to cart" });
    }

    await db.run(
      `UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?`,
      [req.session.userId, productId],
    );
    res.json({ message: "Added to cart" });
  } catch (e) {
    res.status(500).json({ error: `Adding to cart failed: ${e}` });
  } finally {
    if (db) await db.close();
  }
}
