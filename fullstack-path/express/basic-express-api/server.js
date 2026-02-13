import express from "express";
import { startups } from "./data/data";

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.json(startups);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
