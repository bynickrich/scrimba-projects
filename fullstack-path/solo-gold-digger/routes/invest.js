import getGoldPrice from "../data/getGoldPrice.js";

export const invest = async (req, res) => {
  try {
    let body = "";
    for await (let chunk of req) {
      body += chunk;
    }
    const submission = JSON.parse(body);

    if (!submission.amount) throw new Error("No purchase amount received");

    const goldPricePerOunce = getGoldPrice();
    const purchaseAmount = Number(submission.amount);
    const ounces = purchaseAmount / goldPricePerOunce;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: true,
        data: {
          purchasedOunces: ounces,
          currentGoldPrice: goldPricePerOunce,
        },
      }),
    );
  } catch (error) {
    res.statusCode = 401;
    res.end("Error with submission");
    throw error;
  }
};

export default invest;
