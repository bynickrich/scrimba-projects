import express from "express";
import { getGenres, getProducts } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("", getProducts);
productsRouter.get("/genres", getGenres);

export default productsRouter;
