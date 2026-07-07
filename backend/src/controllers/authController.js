const authService = require("../services/authService");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await authService.register(name, email, password, role);
  return ApiResponse.success(res, "User registered successfully", result, 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return ApiResponse.success(res, "User logged in successfully", result);
});

module.exports = {
  register,
  login,
};
