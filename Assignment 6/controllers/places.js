const { v4: uuidv4 } = require("uuid");

// create some dummy data
const TEST_PLACES = [
  {
    id: "1",
    title: "Rowan University",
    description: "Worst University in the world.",
    address: "201 Mullica Hill Rd, Glassboro, NJ 08208",
    location: {
      latitude: 39.7099689,
      longitute: -75.1213872,
    },
    creatorId: "1",
  },
];

const getPlaceById = (req, res, next) => {
  // params property is the query string in the url
  // eg: our router path is at "api/places" so anything after places is the query string
  // eg: "api/places/294" (294 is the placeId)
  const placeId = req.params.placeId;
  const place = TEST_PLACES.find((place) => {
    return place.id === placeId;
  });

  if (!place) {
    const error = new Error("Could not find place.");
    error.code = 404;
    return next(error);
  }

  res.json(place);
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const placeIndex = TEST_PLACES.findIndex((place) => {
    return place.id === placeId;
  });

  TEST_PLACES.splice(placeIndex, 1);

  if (placeIndex === -1) {
    const error = new Error("Could not find place.");
    error.code = 404;
    return next(error);
  }

  res.json({ message: "DELETE successful." });
};

const putPlaceById = (req, res, next) => {
  const id = req.params.placeId;
  const placeIndex = TEST_PLACES.findIndex((place) => place.id === id);

  const {
    title = TEST_PLACES[placeIndex].title,
    description = TEST_PLACES[placeIndex].description,
    location = TEST_PLACES[placeIndex].location,
    address = TEST_PLACES[placeIndex].address,
    creatorId = TEST_PLACES[placeIndex].creatorId,
  } = req.body;

  const updatedPlace = {
    title,
    description,
    location,
    address,
    creatorId,
    ...req.body,
  };

  res.json({ updatedPlace: updatedPlace, message: "PUT successful." });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = TEST_PLACES.find((place) => place.creatorId === userId);

  if (!place) {
    // res.status(404).json({ status: "404", message: "Page can't be found." });
    const error = new Error("Could not find a place for the provided ID");
    error.code = 404;
    throw error;
  }

  res.json(place);
};

const createPlace = (req, res, next) => {
  // we expect req.body with a POST request because there needs to be data to create something
  // const title = req.body.title
  const { title, description, coordinates, address, creatorId } = req.body;

  // create a new place
  const createPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creatorId,
  };

  // push this new place into the TEST_DATA collection
  TEST_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};

// need to bundle multiple functions into a single object that holds pointers to the functions
module.exports = {
  getPlaceById,
  getPlaceByUserId,
  putPlaceById,
  deletePlaceById,
  createPlace,
};
