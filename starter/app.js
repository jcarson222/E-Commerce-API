// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();

// ASYNC ERRORS
require("express-async-errors");

// MISC PACKAGES
const morgan = require("morgan");

// CONNECTDB
const connectDB = require("./db/connect");

// MIDDLEWARE
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(express.json());
app.use(morgan("tiny"));

// GET ROUTE (HOMEPAGE)
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

// PORT
const port = process.env.PORT || 3000;

// START APP
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
