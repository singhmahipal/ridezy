const crypto = require("crypto");
const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model");
const { getAddressCoordinates, getDistanceTime } = require("./maps.service");

function getOtp(digits) {
  return crypto.randomInt(10 ** (digits - 1), 10 ** digits).toString();
}

module.exports.getFare = async (vehicleType, distance, duration) => {
  const rates = {
    auto: { base: 30, perKm: 10, perMin: 2 },
    motorcycle: { base: 20, perKm: 8, perMin: 1.5 },
    car: { base: 50, perKm: 12, perMin: 2.5 },
  };

  const r = rates[vehicleType];
  if (!r) throw new Error("Invalid vehicle type");

  // OSRM: distance in meters, duration in seconds
  const fare =
    r.base + (distance / 1000) * r.perKm + (duration / 60) * r.perMin;
  return Math.round(fare);
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const pickupCoords = await getAddressCoordinates(pickup);
  const destinationCoords = await getAddressCoordinates(destination);
  const { distance, duration } = await getDistanceTime(
    pickupCoords,
    destinationCoords,
  );

  const fare = await module.exports.getFare(vehicleType, distance, duration);

  // no try/catch here: let the controller's catch handle errors
  return await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOtp(6),
    fare,
  });
};

// re-export so the controller's RideService.getAddressCoordinates works
module.exports.getAddressCoordinates = getAddressCoordinates;

// Haversine in JS: simple and avoids geo-index/field-order pitfalls
module.exports.getCaptainsInRadius = async (lat, lng, radiusKm) => {
  const captains = await captainModel.find({
    socketId: { $exists: true, $ne: null },
  });

  const toRad = (d) => (d * Math.PI) / 180;
  const distKm = (lat1, lng1, lat2, lng2) => {
    const a =
      Math.sin(toRad(lat2 - lat1) / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(toRad(lng2 - lng1) / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(a));
  };

  return captains.filter(
    (c) =>
      c.location?.ltd != null &&
      c.location?.lng != null &&
      distKm(lat, lng, c.location.ltd, c.location.lng) <= radiusKm,
  );
};
