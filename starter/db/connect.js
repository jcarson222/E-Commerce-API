const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect;
};

module.exports = connectDB;
