const CustomError = require("../utils/customError");
const { hasPermission } = require("../utils/permissions");

const authorize = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new CustomError("User not authenticated", 401));
    }

    if (!hasPermission(req.user.role, permission)) {
      return next(new CustomError("You do not have permission to perform this action", 403));
    }

    next();
  };
};

module.exports = {
  authorize,
};
