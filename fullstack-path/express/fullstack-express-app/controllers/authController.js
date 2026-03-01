import bcrypt from "bcrypt";
import validator from "validator";
import dbConnection from "../database/DB_CONSTS";

/**
 * @description Registers a new user as long as all fields are valid and the user and email are unique.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
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

  let db;
  try {
    /* ─────────── Test unique username and email ─────────── */
    db = await dbConnection();
    const query = `SELECT username FROM users WHERE username = ? OR email = ?`;
    const testUnique = await db.all(query, [payload.username, payload.email]);

    if (testUnique.length) {
      return res
        .status(400)
        .json({ error: `Email or username already in use.` });
    }

    const { name, email, username, password } = payload;

    /* ─────────── Hash password before insertion ─────────── */
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
    if (db) await db.close();
  }
}

/**
 * @description Logs in the user as long as the fields are filled, username exists, and password hash matches if the user exists.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function loginUser(req, res) {
  const required = ["username", "password"];
  const payload = req.body;

  /* ────────────── Check for missing fields ────────────── */
  const missing = required.filter((field) => !req.body[field]);

  if (missing.length) {
    return res.status(400).json({ error: "All fields are required" });
  }

  /* ──────────────────── Trim username ─────────────────── */
  payload.username = validator.trim(payload.username);

  let db;
  try {
    db = await dbConnection();
    const { username, password } = payload;
    const query = `SELECT id, username, password FROM users WHERE username = ? `;
    const result = await db.get(query, [username]);

    /* ────────────── Check if the user exists ────────────── */
    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    /* ──────────── User exist now check password ─────────── */
    const checkPassword = await bcrypt.compare(password, result.password);

    if (!checkPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = result.id;
    res.json({ message: "Logged In" });
  } catch (e) {
    res.status(500).json({ error: `Log in failed: ${e}` });
  } finally {
    if (db) await db.close();
  }
}

/**
 * @description Destroys the user session and clears the session cookie
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid", { path: "/" });
    res.json({ message: "Logged out" });
  });
}
