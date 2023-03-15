const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  // set up cookie
  const oneDay = 1000 * 60 * 60 * 24; // 1000ms/sec * 60sec/min * 60min/hr * 24hr/day

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
  // 'cookie' is an Express function
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };