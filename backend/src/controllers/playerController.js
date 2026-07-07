const playerService = require("../services/playerService");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const getAllPlayers = asyncHandler(async (req, res) => {
  const result = await playerService.getAllPlayers(req.query);
  return ApiResponse.success(res, "Players retrieved successfully", result);
});

const getPlayerById = asyncHandler(async (req, res) => {
  const player = await playerService.getPlayerById(req.params.id);
  return ApiResponse.success(res, "Player retrieved successfully", player);
});

const getPredefinedFilteredPlayers = asyncHandler(async (req, res) => {
  const { filterType } = req.params;
  const result = await playerService.getPredefinedFilteredPlayers(filterType, req.query);
  return ApiResponse.success(
    res,
    `Players with filter '${filterType}' retrieved successfully`,
    result
  );
});

const createPlayer = asyncHandler(async (req, res) => {
  const newPlayer = await playerService.createPlayer(req.body);
  return ApiResponse.success(res, "Player created successfully", newPlayer, 201);
});

const updatePlayer = asyncHandler(async (req, res) => {
  const updatedPlayer = await playerService.updatePlayer(req.params.id, req.body);
  return ApiResponse.success(res, "Player updated successfully", updatedPlayer);
});

const deletePlayer = asyncHandler(async (req, res) => {
  const deletedPlayer = await playerService.deletePlayer(req.params.id);
  return ApiResponse.success(res, "Player deleted successfully", deletedPlayer);
});

module.exports = {
  getAllPlayers,
  getPlayerById,
  getPredefinedFilteredPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
