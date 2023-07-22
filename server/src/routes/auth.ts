import express from "express";
const router = express.Router();

import {
  register,
  login,
  getCookie,
  logout,
  getCookieData,
  editUser,
  passCheck,
  editProfileImg,
} from "../controllers/authController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getcookiedata", getCookieData);
router.get("/getcookie", getCookie);
router.put("/edituser", editUser);
router.post("/passcheck", passCheck);
router.post("/editprofileimg", upload.single("prfImg"), editProfileImg);

module.exports = router;
