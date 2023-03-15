const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password }); // setting it up this way (instead of .create(req.body)) so the user is created ONLY on these values (so the one registering can't make himself an 'admin'). To make one an admin, must update through mongoDB.

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
