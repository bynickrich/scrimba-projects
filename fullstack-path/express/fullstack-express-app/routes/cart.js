import express from "express";
import {
  addToCart,
  getCartCount,
  getAll,
  deleteItem,
  deleteAll,
} from "../controllers/cartController";
import { requireAuth } from "../middleware/requireAuth";

const cartRouter = express.Router();

cartRouter.use(requireAuth);
cartRouter.post("/add", addToCart);
cartRouter.get("/cart-count", getCartCount);
cartRouter.get("/", getAll);
cartRouter.delete("/all", deleteAll);
cartRouter.delete("/:itemId", deleteItem);

export default cartRouter;
