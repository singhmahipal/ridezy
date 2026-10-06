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
      },
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

module.exports.getDistanceTime = async (origin, destination) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

    const response = await axios.get(url, {
      params: {
        overview: false,
      },
    });

    if (response.data.code !== "Ok") {
      throw new Error(response.data.message || "Unable to fetch route");
    }

    const route = response.data.routes[0];

    return {
      distance: route.distance,
      duration: route.duration,
    };
  } catch (error) {
    console.error("OSRM error:", error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,
          format: "json",
          limit: 5,
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "Ridezy/2.0",
        },
      },
    );
    return response.data.map((place) => place.display_name).filter(Boolean);
  } catch (error) {
    console.error("Nominatim autocomplete error:", error.message);
    throw error;
  }
};
