const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "Ridezy/1.0",
        },
      }
    );

    if (response.data.length === 0) {
      throw new Error("Address not found");
    }

    const location = response.data[0];

    return {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
    };
  } catch (error) {
    console.error("Nominatim error:", error.message);
    throw error;
  }
};
