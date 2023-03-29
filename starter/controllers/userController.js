const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  console.log(req.params);
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name) {
    throw new BadRequestError("Provide name and email");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both old and new passwords");
  }

  const userId = req.user.userId;

  const user = await User.findOne({ _id: userId });

  const correctPassword = await user.comparePassword(oldPassword);

  if (!correctPassword) {
    throw new UnauthenticatedError("Provide correct password");
  }

  user.password = newPassword;

  await user.save();
  // ^^^ .save() is a mongoose method. Saves the document.
  // ^^^ PASSWORD REMAINS HASHED

  res.status(StatusCodes.OK).json("Password successfully updated!");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
