const { Error } = require("mongoose");
const mapServices = require("./maps.service");
const crypto = require("crypto");
const rideModel = require("../models/ride.model");

async function getFare(vehicleType,distance, duration) {

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  return (
    baseFare[vehicleType] +
    (perKmRate[vehicleType] * distance) / 1000 +
    (perMinuteRate[vehicleType] * duration) / 60
  );
}

function generateOtp(num) {
  return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("all fields are required");
  }

  const pickupCoordinates = await mapServices.getAddressCoordinates(pickup);

  const destinationCoordinates =
    await mapServices.getAddressCoordinates(destination);

  const { distance, duration } = await mapServices.getDistanceTime(
    pickupCoordinates,
    destinationCoordinates,
  );

  const fare = await getFare(vehicleType, distance, duration);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: generateOtp(6),
    fare,
    distance,
    duration,
  });

  return ride;
};
