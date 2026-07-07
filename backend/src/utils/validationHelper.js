const formatJoiErrors = (errorDetails) => {
  return errorDetails.reduce((acc, current) => {
    acc[current.path.join(".")] = { message: current.message };
    return acc;
  }, {});
};

module.exports = {
  formatJoiErrors,
};
