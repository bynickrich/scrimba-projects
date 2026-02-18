import express from "express";
import { startups } from "./data/data.js";
import normalize from "./utils/normalize.js";

const PORT = 8000;

const app = express();

app.get("/api", (req, res) => {
  let filteredData = startups;

  if (req.query) {
    for (let [key, value] of Object.entries(req.query)) {
      filteredData = filteredData.filter((item) =>
        normalize(item[key.toLowerCase()], value),
      );
    }

    if (filteredData.length === 0) {
      res
        .status(404)
        .json({ error: "No values matching params", params: req.query });
    }
    return;
  }

  res.json(filteredData);
});

app.get("/api/:field/:term", (req, res) => {
  const { field, term } = req.params;
  const allowedFields = ["country", "continent", "industry"];

  if (!allowedFields.includes(field.toLowerCase())) {
    res.status(400).json({
      message:
        "Search field not allowed. Please use only 'country', 'continent', 'industry'",
    });

    return;
  }

  let filteredData = startups;

  filteredData = filteredData.filter((item) => {
    return normalize(item[field.toLowerCase()], term);
  });

  res.json(filteredData);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
