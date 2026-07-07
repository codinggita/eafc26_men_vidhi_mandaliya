const statsService = require("../services/statsService");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const getPlayerCount = asyncHandler(async (req, res) => {
  const count = await statsService.getPlayerCount();
  return ApiResponse.success(res, "Player count retrieved successfully", { count });
});

const getAverageRating = asyncHandler(async (req, res) => {
  const averageRating = await statsService.getAverageRating();
  return ApiResponse.success(res, "Average rating retrieved successfully", { averageRating });
});

module.exports = {
  getPlayerCount,
  getAverageRating,
};
