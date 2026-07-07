const analyticsService = require("../services/analyticsService");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const getTopRated = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopRated(limit);
  return ApiResponse.success(res, "Top rated players retrieved successfully", result);
});

const getTopScorers = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopScorers(limit);
  return ApiResponse.success(res, "Top scorers retrieved successfully", result);
});

const getTopPassers = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopPassers(limit);
  return ApiResponse.success(res, "Top passing players retrieved successfully", result);
});

const getTopDribblers = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopDribblers(limit);
  return ApiResponse.success(res, "Top dribbling players retrieved successfully", result);
});

const getTopDefenders = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopDefenders(limit);
  return ApiResponse.success(res, "Top defending players retrieved successfully", result);
});

const getTopTeams = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopTeams(limit);
  return ApiResponse.success(res, "Top teams retrieved successfully", result);
});

const getTopLeagues = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopLeagues(limit);
  return ApiResponse.success(res, "Top leagues retrieved successfully", result);
});

const getTopNations = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await analyticsService.getTopNations(limit);
  return ApiResponse.success(res, "Top nations retrieved successfully", result);
});

const getPositionDistribution = asyncHandler(async (req, res) => {
  const result = await analyticsService.getPositionDistribution();
  return ApiResponse.success(res, "Position distribution retrieved successfully", result);
});

module.exports = {
  getTopRated,
  getTopScorers,
  getTopPassers,
  getTopDribblers,
  getTopDefenders,
  getTopTeams,
  getTopLeagues,
  getTopNations,
  getPositionDistribution,
};
