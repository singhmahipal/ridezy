const express = require("express");
const router = express.Router();
const { query } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");
const {
  getCoordinates,
  getDistanceTime,
} = require("../controllers/map.controller");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates,
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTime,
);

module.exports = router;
