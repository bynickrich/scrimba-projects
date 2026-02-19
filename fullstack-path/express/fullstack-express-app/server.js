import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 8000;

app.use(express.static("public"));
app.use("/api/products", productsRouter);
app.use((_, res) => res.status(404).json({ error: "Not Found" }));

app
  .listen(PORT, () => console.log(`Listening on port: ${PORT}`))
  .on("error", (err) => console.error(err));
