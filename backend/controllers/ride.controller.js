const { validationResult } = require("express-validator");
const RideService = require("../services/ride.service");
const {
  getAddressCoordinates,
  getDistanceTime,
} = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");
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

    const pickupCoordinates = await RideService.getAddressCoordinates(pickup);

    let captainInRadius = await RideService.getCaptainsInRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      200,
    );

    if (!captainInRadius || captainInRadius.length === 0) {
      captainInRadius = await captainModel.find({
        socketId: { $exists: true, $ne: null },
      });
    }

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .select("-otp")
      .populate("user");

    captainInRadius.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
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

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await RideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await RideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
