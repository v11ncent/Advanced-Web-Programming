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

const getPlacesById = (req, res, next) => {
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
exports.getPlacesById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
