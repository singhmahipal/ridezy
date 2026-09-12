const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller.js");
const router = express.Router();
const { body } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware.js");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password must be atleast 6 characters long"),
  ],
  registerUser,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters long"),
  ],
  loginUser,
);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser);

module.exports = router;
