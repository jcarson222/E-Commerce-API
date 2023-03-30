const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const getAllProducts = async (req, res) => {
  res.send("all good");
};

const getSingleProduct = async (req, res) => {
  res.send("all good");
};

const createProduct = async (req, res) => {
  res.send("all good");
};

const updateProduct = async (req, res) => {
  res.send("all good");
};

const deleteProduct = async (req, res) => {
  res.send("all good");
};

const uploadImage = async (req, res) => {
  res.send("all good");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
