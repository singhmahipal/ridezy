const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
} = require("../controllers/ride.controller");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");

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

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup location"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination location"),
  authUser,
  getFare,
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  confirmRide,
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("invalid rideId"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("invalid otp"),
  startRide,
);
module.exports = router;
