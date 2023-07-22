import express from "express";
const router = express.Router();

import {
  userDetails,
  deleteUser,
  upDetails,
  sellAllProduct,
  sellOneProduct,
  admins,
} from "../controllers/adminController";

router.get("/admins", admins);
router.get("/userdetails", userDetails);
router.post("/deleteuser", deleteUser);
router.get("/updetails", upDetails);
router.post("/selloneproduct", sellOneProduct);
router.post("/sellallproduct", sellAllProduct);

// router.post("/unselloneproduct", unSellOneProduct);
// router.post("/unsellallproduct", unSellAllProduct);

module.exports = router;
