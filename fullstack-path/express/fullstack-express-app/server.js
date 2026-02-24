import express from "express";
import session from "express-session";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import meRouter from "./routes/me.js";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SPIRAL_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, sameSite: "lax" },
  }),
);
app.use(express.static("public"));
app.use("/api/products", productsRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use((_, res) => res.status(404).json({ error: "Not Found" }));

app
  .listen(PORT, () => console.log(`Running on: http://localhost:${PORT}`))
  .on("error", (err) => console.error(err));
