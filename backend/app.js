const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectToDB = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");
const mapsRoutes = require("./routes/maps.routes.js");
const rideRoutes = require("./routes/ride.routes.js");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes)

module.exports = app;
