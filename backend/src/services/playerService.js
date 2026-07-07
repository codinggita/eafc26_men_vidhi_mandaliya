const Player = require("../models/Player");
const { SORT } = require("../config/constants");
const { getPaginationMetadata } = require("../utils/pagination");
const buildAdvancedFilter = require("../utils/filterBuilder");
const buildRegexSearchQuery = require("../utils/searchHelper");

class PlayerService {
  /**
   * Get all players with filtering, sorting, and pagination
   */
  async getAllPlayers(queryParams) {
    const { page, limit, sort } = queryParams;

    // 1. Build DB Query Object (Combines advanced boundaries and keyword searches)
    const advancedFilter = buildAdvancedFilter(queryParams);
    const textSearchQuery = buildRegexSearchQuery(queryParams.q || queryParams.search);
    const filter = { ...advancedFilter, ...textSearchQuery };

    // 2. Build Pagination skip & limits
    const totalItems = await Player.countDocuments(filter);
    const { skip, limit: parsedLimit, metadata } = getPaginationMetadata(page, limit, totalItems);

    // 3. Build Sort Object
    let sortOption = {};
    if (sort) {
      const isDesc = sort.startsWith("-");
      const field = isDesc ? sort.substring(1) : sort;

      if (SORT.ALLOWED_FIELDS.includes(field)) {
        sortOption[field] = isDesc ? -1 : 1;
      } else {
        sortOption[SORT.DEFAULT_FIELD] = SORT.DEFAULT_ORDER;
      }
    } else {
      sortOption[SORT.DEFAULT_FIELD] = SORT.DEFAULT_ORDER;
    }

    // 4. Query Database
    const players = await Player.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parsedLimit);

    return {
      players,
      pagination: metadata,
    };
  }

  /**
   * Pre-defined query filters (e.g. high-rated, youngsters, veterans)
   */
  async getPredefinedFilteredPlayers(filterType, queryParams) {
    let specificFilter = {};

    switch (filterType) {
      case "high-rated":
        specificFilter = { ovr: { $gte: 85 } };
        break;
      case "low-rated":
        specificFilter = { ovr: { $lt: 75 } };
        break;
      case "high-pace":
        specificFilter = { pace: { $gte: 85 } };
        break;
      case "high-shooters":
        specificFilter = { shooting: { $gte: 85 } };
        break;
      case "high-passers":
        specificFilter = { passing: { $gte: 85 } };
        break;
      case "high-dribblers":
        specificFilter = { dribbling: { $gte: 85 } };
        break;
      case "high-defenders":
        specificFilter = { defending: { $gte: 80 } };
        break;
      case "high-physical":
        specificFilter = { physical: { $gte: 80 } };
        break;
      case "youngsters":
        specificFilter = { age: { $lte: 21 }, ovr: { $gte: 75 } };
        break;
      case "veterans":
        specificFilter = { age: { $gte: 32 } };
        break;
      case "left-footed":
        specificFilter = { preferredFoot: "Left" };
        break;
      case "right-footed":
        specificFilter = { preferredFoot: "Right" };
        break;
      case "five-star-skillers":
        specificFilter = { skillMoves: 5 };
        break;
      case "top-finishers":
        specificFilter = { finishing: { $gte: 85 }, shotPower: { $gte: 80 } };
        break;
      case "top-playmakers":
        specificFilter = { passing: { $gte: 85 }, vision: { $gte: 85 } };
        break;
      default:
        const error = new Error(`Filter type '${filterType}' not recognized`);
        error.statusCode = 400;
        throw error;
    }

    // Merge pagination and sorting
    const { page, limit, sort } = queryParams;
    const totalItems = await Player.countDocuments(specificFilter);
    const { skip, limit: parsedLimit, metadata } = getPaginationMetadata(page, limit, totalItems);

    let sortOption = {};
    if (sort) {
      const isDesc = sort.startsWith("-");
      const field = isDesc ? sort.substring(1) : sort;

      if (SORT.ALLOWED_FIELDS.includes(field)) {
        sortOption[field] = isDesc ? -1 : 1;
      } else {
        sortOption[SORT.DEFAULT_FIELD] = SORT.DEFAULT_ORDER;
      }
    } else {
      sortOption[SORT.DEFAULT_FIELD] = SORT.DEFAULT_ORDER;
    }

    const players = await Player.find(specificFilter)
      .sort(sortOption)
      .skip(skip)
      .limit(parsedLimit);

    return {
      players,
      pagination: metadata,
    };
  }

  /**
   * Get single player by database ID (_id) or custom playerId
   */
  async getPlayerById(id) {
    let player;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      player = await Player.findById(id);
    }

    if (!player) {
      player = await Player.findOne({ playerId: id });
    }

    if (!player) {
      const error = new Error(`Player with ID '${id}' not found`);
      error.statusCode = 404;
      throw error;
    }

    return player;
  }

  /**
   * Create a new player
   */
  async createPlayer(playerData) {
    if (!playerData.playerId) {
      const count = await Player.countDocuments({});
      playerData.playerId = `custom_${count + 1}`;
    }

    const existing = await Player.findOne({ playerId: playerData.playerId });
    if (existing) {
      const error = new Error(`Player with ID '${playerData.playerId}' already exists`);
      error.statusCode = 400;
      throw error;
    }

    return await Player.create(playerData);
  }

  /**
   * Update a player
   */
  async updatePlayer(id, updateData) {
    const player = await this.getPlayerById(id);

    if (updateData.playerId && updateData.playerId !== player.playerId) {
      const existing = await Player.findOne({ playerId: updateData.playerId });
      if (existing) {
        const error = new Error(`Player with ID '${updateData.playerId}' already exists`);
        error.statusCode = 400;
        throw error;
      }
    }

    Object.assign(player, updateData);
    return await player.save();
  }

  /**
   * Delete a player
   */
  async deletePlayer(id) {
    const player = await this.getPlayerById(id);
    await player.deleteOne();
    return player;
  }
}

module.exports = new PlayerService();
