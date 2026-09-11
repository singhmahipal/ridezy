const express = require("express");
const { registerUser } = require("../controllers/user.controller.js");
const router = express.Router();
const { body } = require("express-validator");

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

module.exports = router;
