const Player = require("../models/Player");
const User = require("../models/User");

class AdminService {
  async getDashboardStats() {
    const totalPlayers = await Player.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const playersStats = await Player.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$ovr" },
          maxRating: { $max: "$ovr" },
        },
      },
    ]);

    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const roleCounts = usersByRole.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      { admin: 0, user: 0 }
    );

    return {
      players: {
        total: totalPlayers,
        averageRating: playersStats[0] ? Number(playersStats[0].avgRating.toFixed(2)) : 0,
        maxRating: playersStats[0] ? playersStats[0].maxRating : 0,
      },
      users: {
        total: totalUsers,
        adminCount: roleCounts.admin,
        userCount: roleCounts.user,
      },
    };
  }
}

module.exports = new AdminService();
