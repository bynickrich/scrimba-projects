import validator from "validator";

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

  console.log("Payload Complete and Cleaned", payload);
}
