import { startups } from "../data/data.js";
import normalize from "../utils/normalize.js";

const getAllData = (req, res) => {
  let filteredData = startups;

  if (req.query) {
    for (let [key, value] of Object.entries(req.query)) {
      filteredData = filteredData.filter((item) =>
        normalize(item[key.toLowerCase()], value),
      );
    }

    if (filteredData.length === 0) {
      return res
        .status(404)
        .json({ error: "No values matching params", params: req.query });
    }
  }

  res.json(filteredData);
};

export { getAllData };
