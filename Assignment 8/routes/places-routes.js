const express = require("express");
const { check } = require("express-validator");
const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

router.get("/:placeId", placesControllers.getPlacesById);
router.get("/user/:uid", placesControllers.getPlaceByUserID);
router.put("/:placeId", placesControllers.putPlaceById);
router.delete("/:placeId", placesControllers.deletePlaceById);

router.post("/", placesControllers.createPlace);

module.exports = router;
