import express from "express";
import { getAllData } from "../controllers/getAllData.js";
import { getDataByPathParams } from "../controllers/getDataByPathParams.js";

const apiRouter = express.Router();

apiRouter.get("", getAllData);
apiRouter.get("/:field/:term", getDataByPathParams);

export default apiRouter;
