const adminService = require("../services/adminService");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  return ApiResponse.success(res, "Admin dashboard stats retrieved successfully", stats);
});

module.exports = {
  getDashboardStats,
};
