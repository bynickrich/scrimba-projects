import express from "express";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static("public"));
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use((_, res) => res.status(404).json({ error: "Not Found" }));

app
  .listen(PORT, () => console.log(`Running on: http://localhost:${PORT}`))
  .on("error", (err) => console.error(err));
