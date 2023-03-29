const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse } = require("../utils");
//////////////////REGISTER////////////////////////

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // first registered user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0; // If user created is the first registered user, make 'admin'. All others after, make 'user'.
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user });
};
///////////////////LOGIN//////////////////////

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Provide email and password to log in");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("User with provided email does not exist");
  }

  const correctPassword = await user.comparePassword(password);

  if (!correctPassword) {
    throw new UnauthenticatedError("Provide correct password");
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ tokenUser });
};
//////////////////LOGOUT//////////////////////

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000), // 5 seconds idk why
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out" }); // <-- Only for dev purposes
};

module.exports = { register, login, logout };
