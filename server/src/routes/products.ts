import express from "express";
import {
  getProductById,
  getProducts,
  getProductsByCategory,
} from "../controllers/productController";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);

module.exports = router;
