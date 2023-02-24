const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api", (req, res) => {
  res.send("Sent form data.");
  console.log("Received form data.");
  const data = JSON.stringify(req.body);

  fs.writeFile("registration-data.txt", data, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
