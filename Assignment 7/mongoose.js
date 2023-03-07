require("dotenv").config();
const mongoose = require("mongoose");

const dbUsername = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.kztcpf6.mongodb.net/user?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to the mongoDb database.");
  })
  .catch(() => {
    console.error("Connection failed.");
  });

const User = require("./models/User");

const postUser = async (req, res, next) => {
  const userObject = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await userObject.save();

  res.json(result);
};

const getUsers = async (req, res, next) => {
  const users = await User.find().exec();

  res.json(users);
};

exports.postUser = postUser;
exports.getUsers = getUsers;
