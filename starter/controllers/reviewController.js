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
  // GET ALL REVIEWS AND POPULATE THEM WITH NAME,COMPANY,PRICE
  const reviews = await Review.find({}).populate({
    path: "product", // <-- because our review model has a product property that references 'Product'
    select: "name company price",
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`Review with id: ${reviewId} does not exist`);
  }

  res.status(StatusCodes.OK).json({ review });
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
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`Review with id: ${reviewId} does not exist`);
  }

  checkPermissions(req.user, review.user);

  await Review.deleteOne({ _id: reviewId });

  res.status(StatusCodes.OK).json("Review removed successfully");
};

const singleProductReviews = async (req, res) => {
  const { id: productId } = req.params;

  const reviews = await Review.find({ product: productId });

  let count = reviews.length;

  if (count === 0) {
    res
      .status(StatusCodes.OK)
      .json("Be the first to leave a review for this product!");
  } else {
    res.status(StatusCodes.OK).json({ reviews, count: count });
  }
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
  singleProductReviews,
};
