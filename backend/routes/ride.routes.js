const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide } = require("../controllers/ride.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "motorcycle", "car"])
    .withMessage("invalid vehicle type"),
  authUser,
  createRide,
);

module.exports = router;
