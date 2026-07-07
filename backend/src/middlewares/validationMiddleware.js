const CustomError = require("../utils/customError");
const { formatJoiErrors } = require("../utils/validationHelper");

const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const dataToValidate = req[source];
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const customErr = new CustomError("Validation Error", 400);
      customErr.name = "ValidationError";
      customErr.errors = formatJoiErrors(error.details);
      return next(customErr);
    }

    req[source] = value;
    next();
  };
};

module.exports = validate;
