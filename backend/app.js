const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectToDB = require("./db/db.js");

app.use(cors());

connectToDB();

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
