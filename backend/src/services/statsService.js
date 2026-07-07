const Player = require("../models/Player");

class StatsService {
  async getPlayerCount() {
    return await Player.countDocuments({});
  }

  async getAverageRating() {
    const stats = await Player.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$ovr" },
        },
      },
    ]);
    return stats[0] ? Number(stats[0].averageRating.toFixed(2)) : 0;
  }
}

module.exports = new StatsService();
