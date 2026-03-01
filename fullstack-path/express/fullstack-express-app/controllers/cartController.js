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

export async function getCartCount(req, res) {
  let db;

  try {
    db = await dbConnection();

    // TODO: Refactor to use SQL sum syntax instead of returning all table items
    const query = `SELECT * FROM cart_items WHERE user_id = ?`;
    const params = [req.session.userId];
    const results = await db.all(query, params);

    const totalItems =
      results.reduce((acc, item) => acc + item.quantity, 0) || 0;

    res.json({ totalItems });
  } catch (err) {
    res.status(500).json({ error: `Getting cart items failed: ${err}` });
  } finally {
    if (db) await db.close();
  }
}

export async function getAll(req, res) {
  let db;

  try {
    db = await dbConnection();

    const query = `SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.user_id = ?`;

    const params = [req.session.userId];
    const items = await db.all(query, params);

    res.json({ items: items });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch cart items: ${err}` });
  } finally {
    if (db) await db.close();
  }
}

export async function deleteItem(req, res) {
  let db;

  try {
    db = await dbConnection();

    // Check if the item is valid
    const itemId = parseInt(req.params.itemId, 10);

    if (isNaN(itemId)) {
      return res.status(404).json({ message: "Invalid item ID" });
    }

    const item = await db.get(
      "SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?",
      [itemId, req.session.userId],
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    // Delete item from cart
    await db.run(`DELETE FROM cart_items WHERE user_id = ? AND id = ?`, [
      req.session.userId,
      itemId,
    ]);

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch cart items: ${err}` });
  } finally {
    if (db) await db.close();
  }
}

export async function deleteAll(req, res) {
  let db;

  try {
    db = await dbConnection();

    await db.run(`DELETE FROM cart_items WHERE user_id = ?`, [
      req.session.userId,
    ]);

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: `Failed to delete items: ${err}` });
  } finally {
    if (db) await db.close();
  }
}
