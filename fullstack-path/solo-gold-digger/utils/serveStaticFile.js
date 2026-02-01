import path from "node:path";
import fs from "node:fs/promises";
import mimeTypes from "./mimeTypes.js";

const PUBLIC_PATH = path.join(process.cwd(), "public");

export const serveStaticFile = async (req, res) => {
  try {
    const file = path.join(
      PUBLIC_PATH,
      req.url === "/" ? "index.html" : req.url,
    );
    const data = await fs.readFile(file);
    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      mimeTypes[path.extname(file).substring(1).toLowerCase()] ||
        mimeTypes.default,
    );
    res.end(data);
  } catch (error) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(await fs.readFile(path.join(PUBLIC_PATH, "404.html")));
  }
};

export default serveStaticFile;
