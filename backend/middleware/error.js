const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // MongoDB error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //MongoDB duplicate key error

  if (err.code === 11000) {
    const message = `User already exists`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid entry, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Token expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
