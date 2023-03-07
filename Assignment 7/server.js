const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const app = express();
const port = 7777;

app.use(bodyParser.json());

app.get("/user", mongoose.getUsers);
app.post("/user", mongoose.postUser);

app.listen(port);
