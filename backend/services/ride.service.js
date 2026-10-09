const { validationResult } = require("express-validator");
const RideService = require("../services/ride.service");
const {
  getAddressCoordinates,
  getDistanceTime,
} = require("../services/maps.service");
const captainModel = require("../models/captain.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await RideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    return res.status(201).json(ride);
  } catch (error) {
    console.error("Create ride error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (vehicleType, distance, duration) => {
  try {
    let baseFare = 0;
    let perKmRate = 0;
    let perMinuteRate = 0;

    switch (vehicleType) {
      case "auto":
        baseFare = 30;
        perKmRate = 10;
        perMinuteRate = 2;
        break;

      case "motorcycle":
        baseFare = 20;
        perKmRate = 8;
        perMinuteRate = 1.5;
        break;

      case "car":
        baseFare = 50;
        perKmRate = 12;
        perMinuteRate = 2.5;
        break;

      default:
        throw new Error("Invalid vehicle type");
    }

    // OSRM distance is in meters
    // OSRM duration is in seconds
    const distanceInKm = distance / 1000;
    const durationInMinutes = duration / 60;

    const fare =
      baseFare + distanceInKm * perKmRate + durationInMinutes * perMinuteRate;

    return Math.round(fare);
  } catch (error) {
    console.error("Fare calculation error:", error);
    throw error;
  }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
