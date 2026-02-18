import { startups } from "../data/data.js";
import normalize from "../utils/normalize.js";

const getDataByPathParams = async (req, res) => {
  console.log("getDataByPathParams called");
  const { field, term } = req.params;
  const allowedFields = ["continent", "country", "industry"];

  if (!allowedFields.includes(field.toLowerCase())) {
    return res.status(400).json({
      message:
        "Search field not allowed. Please use only 'country', 'continent', 'industry'",
    });
  }

  let filteredData = startups;

  filteredData = filteredData.filter((item) => {
    return normalize(item[field.toLowerCase()], term);
  });

  res.json(filteredData);
};

export { getDataByPathParams };
