import express from "express";
import {
  getCartProducts,
  postCartProducts,
  deleteCartProduct,
  buyOneProduct,
  getBuyProducts,
  buyCartProducts,
  setReview,
  deleteProductById,
} from "../controllers/userProductController";
const router = express.Router();

router.post("/getByEmail", getCartProducts);
router.post("/", postCartProducts);
router.post("/deleteCartProduct", deleteCartProduct);
router.post("/buyoneproduct", buyOneProduct);
router.post("/getbuyproducts", getBuyProducts);
router.post("/buycartproducts", buyCartProducts);
router.post("/deleteproductbyid", deleteProductById);
router.post("/setreview", setReview);

module.exports = router;
