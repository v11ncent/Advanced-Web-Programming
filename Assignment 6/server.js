const express = require("express");
const bodyParser = require("body-parser");

// import our places router
const places = require("./routers/places");
const app = express();
const port = 7777;

// we will add middleware that parses data
app.use(bodyParser.json());

// use default Express error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  // check if we get an error code property
  res
    .status(error.code || 500)
    .json({ message: error.message || "A server error has occurred." });
});

// now we can use the routes as middleware
// first argument is the route, second argument is the router
app.use("/api/places", places);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
