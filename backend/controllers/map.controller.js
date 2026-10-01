const mapService = require("../services/maps.service.js");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      message: "co-ordinates not found",
      error: error.message,
    });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const originCoordinates = await mapService.getAddressCoordinates(origin);
    const destinationCoordinates =
      await mapService.getAddressCoordinates(destination);

    const distanceTime = await mapService.getDistanceTime(
      originCoordinates,
      destinationCoordinates,
    );

    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports.getAutoSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const getAutoSuggestions =
      await mapService.getAutoCompleteSuggestions(input);

    res.status(200).json(getAutoSuggestions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unable to fetch autocomplete suggestions" });
  }
};
