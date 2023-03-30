// DOTENV
require("dotenv").config();

// ASYNC ERRORS
require("express-async-errors");

// EXPRESS
const express = require("express");
const app = express();

// CONNECTDB
const connectDB = require("./db/connect");

// MISC PACKAGES
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// MIDDLEWARE
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

// IMPORT ROUTES
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

// GET ROUTE (HOMEPAGE)
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/api/v1", (req, res) => {
  //console.log(req.cookies); // <-- .cookies available from 'cookie-parser'
  console.log(req.signedCookies);
  res.send("<h1>Cookie check</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

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
