const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const {checkPermissions} = require('../utils')

const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};

const getSingleReview = async (req, res) => {
  res.send("get single reviews");
};

const createReview = async (req, res) => {
  req.body.product = 
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
