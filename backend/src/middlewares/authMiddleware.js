const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const User = require("../models/User");
const CustomError = require("../utils/customError");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new CustomError("You are not logged in. Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new CustomError("The user belonging to this token no longer exists.", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new CustomError("Invalid token. Please log in again.", 401));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("You do not have permission to perform this action", 403));
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
