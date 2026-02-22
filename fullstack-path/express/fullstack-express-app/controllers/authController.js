import validator from "validator";
import dbConnection from "../database/DB_CONSTS";
import bcrypt from "bcrypt";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */

export async function registerUser(req, res) {
  const required = ["name", "email", "username", "password"];
  const payload = req.body;
  const userNameReg = new RegExp("^[a-zA-Z0-9_-]{1,20}$");

  const missing = required.filter((field) => !req.body[field]);

  if (missing.length) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Trim before testing
  payload.name = validator.trim(payload.name);
  payload.email = validator.trim(payload.email);
  payload.username = validator.trim(payload.username);

  if (!validator.isEmail(payload.email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!userNameReg.test(payload.username)) {
    return res.status(400).json({
      error: "Username contains invalid characters.",
    });
  }

  const db = await dbConnection();
  const query = `SELECT username FROM users WHERE username = ? OR email = ?`;
  const testUnique = await db.all(query, [payload.username, payload.email]);

  if (testUnique.length) {
    return res.status(400).json({ error: `Email or username already in use.` });
  }

  try {
    const { name, email, username, password } = payload;

    // Hash the password before inserting
    const hashed = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?,?,?,?)`,
      [name, email, username, hashed],
    );

    req.session.userId = result.lastID;

    res.status(201).json({ message: "User registered" });
  } catch (e) {
    res.status(500).json({ error: `Registration failed: ${e}` });
  } finally {
    await db.close();
  }
}

export async function loginUser(req, res) {}
