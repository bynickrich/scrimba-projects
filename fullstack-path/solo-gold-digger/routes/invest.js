export const invest = async (req, res) => {
  try {
    let body = "";
    for await (let chunk of req) {
      body += chunk;
    }
    const submission = JSON.parse(body);

    console.log(submission);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, data: submission }));
  } catch (error) {
    res.statusCode = 401;
    res.end("Error with submission");
    throw error;
  }
};

export default invest;
