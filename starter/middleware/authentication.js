const { request } = require("express");
const req = require("express/lib/request");
const { forbidden } = require("joi");
const {
  BadRequestError,
  UnauthenticatedError,
  ForbiddenError,
} = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  const checkRoles = (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("Permission denied");
    }
    next();
  };

  return checkRoles;
};

module.exports = { authenticateUser, authorizePermissions };
