import * as http from "node:http";
import serveStaticFile from "./utils/serveStaticFile.js";
import invest from "./routes/invest.js";
import goldPrice from "./routes/goldPrice.js";

const PORT = 8000;

http
  .createServer(async (req, res) => {
    if (req.url === "/api/gold-price" && req.method === "GET")
      await goldPrice(req, res);
    else if (req.url === "/api/invest" && req.method === "POST")
      await invest(req, res);
    else if (req.method === "GET") await serveStaticFile(req, res);
  })
  .listen(PORT);

console.log(`Server running on port: http://localhost:${PORT}`);
