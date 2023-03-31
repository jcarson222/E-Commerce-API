const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const { checkPermissions } = require("../utils");

const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};

const getSingleReview = async (req, res) => {
  res.send("get single reviews");
};

const createReview = async (req, res) => {
  // CHECK IF PRODUCT EXISTS
  const { product: productId } = req.body;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`Product with id: ${productId} does not exist`);
  }

  // CHECK IF REVIEW ALREADY SUBMITTED BY USER
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError(
      "You have already submitted a review for this project"
    );
  }

  // GET USER TO REQ.BODY
  req.body.user = req.user.userId;

  // CREATE REVIEW
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const updateReview = async (req, res) => {
  res.send("update review");
};

const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
