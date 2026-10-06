const { validationResult } = require("express-validator");
const RideService = require("../services/ride.service");
const {
  getAddressCoordinates,
  getDistanceTime,
} = require("../services/maps.service");

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

module.exports.getFare = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { pickup, destination } = req.query;

    const pickupCoordinates = await getAddressCoordinates(pickup);

    const destinationCoordinates = await getAddressCoordinates(destination);

    const { distance, duration } = await getDistanceTime(
      pickupCoordinates,
      destinationCoordinates,
    );

    const fare = {
      auto: await RideService.getFare("auto", distance, duration),

      motorcycle: await RideService.getFare("motorcycle", distance, duration),

      car: await RideService.getFare("car", distance, duration),
    };

    return res.status(200).json(fare);
  } catch (error) {
    console.error("get fare error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
