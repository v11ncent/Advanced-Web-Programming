const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const Place = require("../models/place");
const mongoose = require("mongoose");

const putPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  const data = req.body;

  try {
    let doc = await Place.findOneAndUpdate({ _id: placeId }, req.body);

    res.status(200).json({
      status: 200,
      message: `Updated place with id of ${placeId} successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
      error,
    });
  }
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    await Place.deleteById(placeId);

    res.status(200).json({
      status: 200,
      message: `Deleted place with id of ${placeId} successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
      error,
    });
  }
};

const getPlacesById = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, could not find a place." });
  }

  if (!place) {
    const error = new Error("Could not find a place for the provided ID");
    error.code = 404;
    throw error;
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlaceByUserID = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Fetching places has failed, please try again later" });
  }

  if (!place) {
    const error = new Error("Could not find a place for the provided ID");
    error.code = 404;

    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.errpr(errors);

    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const { title, description, coordinates, adress, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    image:
      "https://images.unsplash.com/photo-1678153188688-0dc45722708a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Creating place failed, please try again" });
  }

  res.status(201).json({ place: createdPlace });
};

exports.createPlace = createPlace;
exports.getPlacesById = getPlacesById;
exports.getPlaceByUserID = getPlaceByUserID;
exports.putPlaceById = putPlaceById;
exports.deletePlaceById = deletePlaceById;
