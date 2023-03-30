const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { default: mongoose } = require("mongoose");

const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};

const getSingleReview = async (req, res) => {
  res.send("get single reviews");
};

const createReview = async (req, res) => {
  res.send("create review");
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
