const express = require("express");
const router = express.Router();
const { query } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");
const { getCoordinates } = require("../controllers/map.controller");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates,
);

module.exports = router;
