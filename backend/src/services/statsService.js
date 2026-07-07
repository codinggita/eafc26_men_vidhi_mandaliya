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

  async getPlayersCombinedStats() {
    const count = await this.getPlayerCount();
    const averageRating = await this.getAverageRating();
    
    const [highestRated, highestPaced, highestShooting, highestPassing, highestDribbling, highestDefending, highestPhysical] = await Promise.all([
      Player.findOne({ ovr: { $ne: null } }).sort({ ovr: -1 }).select("name team nation ovr position"),
      Player.findOne({ pace: { $ne: null } }).sort({ pace: -1 }).select("name team nation pace position"),
      Player.findOne({ shooting: { $ne: null } }).sort({ shooting: -1 }).select("name team nation shooting position"),
      Player.findOne({ passing: { $ne: null } }).sort({ passing: -1 }).select("name team nation passing position"),
      Player.findOne({ dribbling: { $ne: null } }).sort({ dribbling: -1 }).select("name team nation dribbling position"),
      Player.findOne({ defending: { $ne: null } }).sort({ defending: -1 }).select("name team nation defending position"),
      Player.findOne({ physical: { $ne: null } }).sort({ physical: -1 }).select("name team nation physical position"),
    ]);

    return {
      count,
      averageRating,
      highestRated,
      highestPaced,
      highestShooting,
      highestPassing,
      highestDribbling,
      highestDefending,
      highestPhysical,
    };
  }
}

module.exports = new StatsService();
