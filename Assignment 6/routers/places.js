const express = require("express");
// we need a special tool for registering middleware
const router = express.Router();

const placesControllers = require("../controllers/places");

// http method(.get) + filter(path -- "/") + callback function
router.get("/:placeId", placesControllers.getPlacesById);

// registers a new route at /user/:uid
router.get("/user/:uid", placesControllers.getPlaceByUserId);

// add new POST middleware
router.post("/", placesControllers.createPlace);

module.exports = router;
