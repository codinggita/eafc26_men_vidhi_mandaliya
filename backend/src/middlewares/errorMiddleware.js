const ApiResponse = require("../utils/apiResponse");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((el) => el.message);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: '${err.keyValue[key]}' for field '${key}'.`;
  }

  // Handle Mongoose Cast Error (e.g. Invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  // Under development, show stack trace and details
  const errorPayload = {};
  if (errors) {
    errorPayload.details = errors;
  }
  if (process.env.NODE_ENV !== "production") {
    errorPayload.stack = err.stack;
  }

  return ApiResponse.error(
    res,
    message,
    statusCode,
    Object.keys(errorPayload).length > 0 ? errorPayload : null
  );
};

module.exports = errorMiddleware;
