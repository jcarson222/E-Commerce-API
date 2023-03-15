// DOTENV
require("dotenv").config();

// ASYNC ERRORS
require("express-async-errors");

// EXPRESS
const express = require("express");
const app = express();

// CONNECTDB
const connectDB = require("./db/connect");

app.use(express.json());

// MISC PACKAGES
const morgan = require("morgan");

// MIDDLEWARE
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));

// IMPORT ROUTES
const authRouter = require("./routes/authRoutes");

// GET ROUTE (HOMEPAGE)
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

// PORT
const port = process.env.PORT || 3000;

// START APP
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => console.log(`Server listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
