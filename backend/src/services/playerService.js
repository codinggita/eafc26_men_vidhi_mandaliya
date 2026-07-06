const Player = require("../models/Player");

class PlayerService {
  /**
   * Get all players with filtering, sorting, and pagination
   */
  async getAllPlayers(queryParams) {
    const {
      page = 1,
      limit = 10,
      sort,
      search,
      ovr,
      minPace,
      minShooting,
      minPassing,
      minDribbling,
      minDefending,
      minPhysical,
      team,
      league,
      nation,
      position,
      preferredFoot,
      age,
      skillMoves,
      weakFoot,
    } = queryParams;

    const filter = {};

    // Basic Filters
    if (ovr) filter.ovr = Number(ovr);
    if (age) filter.age = Number(age);
    if (skillMoves) filter.skillMoves = Number(skillMoves);
    if (weakFoot) filter.weakFoot = Number(weakFoot);
    if (preferredFoot) filter.preferredFoot = preferredFoot;

    // String matching (case-insensitive partial match)
    if (team) filter.team = { $regex: team, $options: "i" };
    if (league) filter.league = { $regex: league, $options: "i" };
    if (nation) filter.nation = { $regex: nation, $options: "i" };
    if (position) filter.position = { $regex: `^${position}$`, $options: "i" };

    // Min Range filters
    if (minPace) filter.pace = { $gte: Number(minPace) };
    if (minShooting) filter.shooting = { $gte: Number(minShooting) };
    if (minPassing) filter.passing = { $gte: Number(minPassing) };
    if (minDribbling) filter.dribbling = { $gte: Number(minDribbling) };
    if (minDefending) filter.defending = { $gte: Number(minDefending) };
    if (minPhysical) filter.physical = { $gte: Number(minPhysical) };

    // Search query (across name, team, league, nation)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { team: { $regex: search, $options: "i" } },
        { league: { $regex: search, $options: "i" } },
        { nation: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortOption = {};
    if (sort) {
      // Support reverse order sorting if field prefixed with '-'
      const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith("-") ? -1 : 1;
      sortOption[sortField] = sortOrder;
    } else {
      // Default sort by rank ascending
      sortOption.rank = 1;
    }

    const total = await Player.countDocuments(filter);
    const players = await Player.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    return {
      players,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum) || 1,
      },
    };
  }

  /**
   * Get single player by database ID (_id) or custom playerId
   */
  async getPlayerById(id) {
    let player;
    // Check if the id is a valid Mongo ObjectId format
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      player = await Player.findById(id);
    }

    // Fallback to searching by custom playerId
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
    // Generate playerId if not provided
    if (!playerData.playerId) {
      const count = await Player.countDocuments({});
      playerData.playerId = `custom_${count + 1}`;
    }

    // Ensure playerId is unique
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

    // Prevent direct manual update of playerId to a duplicate value
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
