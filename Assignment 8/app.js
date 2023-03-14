const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

const url = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(url)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
