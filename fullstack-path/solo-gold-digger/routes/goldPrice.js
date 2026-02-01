export const goldPrice = async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ res: "SUCCESS" }));
};

export default goldPrice;
