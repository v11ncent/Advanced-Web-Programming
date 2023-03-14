const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, reqired: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true },
});

// https://masteringjs.io/tutorials/mongoose/delete-by-id

placeSchema.statics.deleteById = function (_id) {
  return this.deleteOne({ _id: _id });
};

module.exports = mongoose.model("Place", placeSchema);
