const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const getAllProducts = async (req, res) => {
  res.send("getAllProducts");
};

const getSingleProduct = async (req, res) => {
  res.send("getSingleProduct");
};

const createProduct = async (req, res) => {
  res.send("createProduct");
};

const updateProduct = async (req, res) => {
  res.send("updateProduct");
};

const deleteProduct = async (req, res) => {
  res.send("deleteProduct");
};

const uploadImage = async (req, res) => {
  res.send("uploadImage");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
