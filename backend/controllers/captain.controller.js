const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const { createCaptain } = require("../services/captain.service");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

  if (isCaptainAlreadyRegistered) {
    return res.status(400).json({ message: "captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
    plate: vehicle.plate,
  });

  const token = captain.generateAuthToken();

  res.status(200).json({ token, captain });
};
