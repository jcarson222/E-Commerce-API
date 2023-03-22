const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const userGuy = await User.findOne({ _id: req.params.id }).select(
    "-password"
  );

  if (!userGuy) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ userGuy });
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
