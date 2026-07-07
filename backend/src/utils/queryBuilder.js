/**
 * Dynamically builds a Mongoose filter query object based on input params
 * @param {Object} queryParams 
 * @returns {Object} Mongoose filter object
 */
const buildPlayerQuery = (queryParams) => {
  const filter = {};

  const { team, league, nation, position, search, q } = queryParams;

  // Exact position filter, case-insensitive
  if (position) {
    filter.position = { $regex: `^${position}$`, $options: "i" };
  }

  // Partial matches for string fields, case-insensitive
  if (team) {
    filter.team = { $regex: team, $options: "i" };
  }
  if (league) {
    filter.league = { $regex: league, $options: "i" };
  }
  if (nation) {
    filter.nation = { $regex: nation, $options: "i" };
  }

  // Text search on name, team, league, nation
  const keyword = search || q;
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { team: { $regex: keyword, $options: "i" } },
      { league: { $regex: keyword, $options: "i" } },
      { nation: { $regex: keyword, $options: "i" } },
    ];
  }

  return filter;
};

module.exports = {
  buildPlayerQuery,
};
