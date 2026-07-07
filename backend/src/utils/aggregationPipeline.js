const buildTopPlayersPipeline = (sortByField, limit = 10) => {
  return [{ $sort: { [sortByField]: -1 } }, { $limit: Number(limit) }];
};

const buildTopGroupsPipeline = (groupByField, limit = 10) => {
  return [
    {
      $group: {
        _id: `$${groupByField}`,
        averageRating: { $avg: "$ovr" },
        maxRating: { $max: "$ovr" },
        playerCount: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: Number(limit) },
    {
      $project: {
        _id: 0,
        [groupByField]: "$_id",
        averageRating: { $round: ["$averageRating", 2] },
        maxRating: 1,
        playerCount: 1,
      },
    },
  ];
};

const buildPositionDistributionPipeline = () => {
  return [
    {
      $group: {
        _id: "$position",
        count: { $sum: 1 },
        averageRating: { $avg: "$ovr" },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        position: "$_id",
        count: 1,
        averageRating: { $round: ["$averageRating", 2] },
      },
    },
  ];
};

module.exports = {
  buildTopPlayersPipeline,
  buildTopGroupsPipeline,
  buildPositionDistributionPipeline,
};
