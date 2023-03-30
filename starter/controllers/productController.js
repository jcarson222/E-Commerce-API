const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { response } = require("express");
const { findOneAndRemove } = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getSingleProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  const singleProduct = await Product.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ singleProduct });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    body: { name, company, price },
    params: { id },
    user: { userId },
  } = req;

  if (!name || !company || !price) {
    throw new BadRequestError("Provide name, company, and price values");
  }

  const product = await Product.findOneAndUpdate(
    { _id: id, user: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new BadRequestError("Product does not exist");
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const product = await Product.findOneAndRemove({ _id: id, user: userId });

  if (!product) {
    throw new BadRequestError("Product does not exist");
  }

  res.status(StatusCodes.OK).send(`${product} has been removed`);
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
