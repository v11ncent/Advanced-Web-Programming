const express = require("express");
// we need a special tool for registering middleware
const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
  deletePlaceById,
  createPlace,
  putPlaceById,
} = require("../controllers/places");

// http method(.get) + filter(path -- "/") + callback function
router.get("/:placeId", getPlaceById);
router.delete("/:placeId", deletePlaceById);
router.put("/:placeId", putPlaceById);

// registers a new route at /user/:uid
router.get("/user/:uid", getPlaceByUserId);

// add new POST middleware
router.post("/", createPlace);

module.exports = router;
