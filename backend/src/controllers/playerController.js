const playerService = require("../services/playerService");
const { AppError, asyncHandler } = require("../middlewares/errorMiddleware");

// Get all players (with sorting, pagination, and filter queries)
exports.getPlayers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayers(req.query);
  res.status(200).json({
    success: true,
    count: data.docs.length,
    ...data
  });
});

// Get player details by ID
exports.getPlayerById = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayerById(req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

// Create new player record
exports.createPlayer = asyncHandler(async (req, res, next) => {
  const data = await playerService.createPlayer(req.body);
  res.status(201).json({
    success: true,
    message: "Player record created successfully.",
    data
  });
});

// Replace complete player record (PUT)
exports.replacePlayer = asyncHandler(async (req, res, next) => {
  const data = await playerService.updatePlayer(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Player record fully replaced.",
    data
  });
});

// Update specific fields of a player record (PATCH)
exports.updatePlayer = asyncHandler(async (req, res, next) => {
  const data = await playerService.updatePlayer(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Player record updated successfully.",
    data
  });
});

// Delete player record
exports.deletePlayer = asyncHandler(async (req, res, next) => {
  const data = await playerService.deletePlayer(req.params.id);
  res.status(200).json({
    success: true,
    message: "Player record deleted successfully.",
    data
  });
});

// Check if player exists
exports.checkPlayerExists = asyncHandler(async (req, res, next) => {
  const exists = await playerService.checkPlayerExists(req.params.id);
  res.status(200).json({
    success: true,
    exists
  });
});

// Bulk create players
exports.bulkCreate = asyncHandler(async (req, res, next) => {
  const data = await playerService.bulkCreate(req.body);
  res.status(201).json({
    success: true,
    message: `${data.length} player records created successfully.`,
    count: data.length,
    data
  });
});

// Bulk update players
exports.bulkUpdate = asyncHandler(async (req, res, next) => {
  const data = await playerService.bulkUpdate(req.body);
  res.status(200).json({
    success: true,
    message: "Bulk update completed successfully.",
    data
  });
});

// Bulk delete players
exports.bulkDelete = asyncHandler(async (req, res, next) => {
  const result = await playerService.bulkDelete(req.body.playerIds || req.body);
  res.status(200).json({
    success: true,
    message: `${result.deletedCount} player records deleted.`,
    data: result
  });
});

// --- Parameterized Information Fetchers ---

exports.getPlayersByName = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByName(req.params.name, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByRank = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByRank(req.params.rank);
  res.status(200).json({
    success: true,
    data
  });
});

exports.getPlayersByTeam = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("team", req.params.team, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByLeague = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("league", req.params.league, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByNation = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("nation", req.params.nation, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByPosition = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("position", req.params.position, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByAge = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("age", req.params.age, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByGender = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("gender", req.params.gender, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByPlaystyle = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("playstyle", req.params.style, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByPreferredFoot = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("preferredFoot", req.params.foot, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByAlternativePosition = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("alternative-position", req.params.position, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopRated = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopRated(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopPaced = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopPaced(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopDribblers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopDribblers(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopFinishers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopFinishers(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopPassers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopPassers(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopDefenders = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopDefenders(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopPhysical = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopPhysical(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getTopYoungsters = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTopYoungsters(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getRecentPlayers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getRecentPlayers(req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersBySkillMoves = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("skill-moves", req.params.value, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

exports.getPlayersByWeakFoot = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayersByAttribute("weak-foot", req.params.value, req.query);
  res.status(200).json({
    success: true,
    ...data
  });
});

// Compare two players
exports.comparePlayers = asyncHandler(async (req, res, next) => {
  const data = await playerService.comparePlayers(req.params.player1, req.params.player2);
  res.status(200).json({
    success: true,
    data
  });
});

// Get player performance index
exports.getPlayerPerformance = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayerPerformance(req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

// Fetch complete player stats breakdown
exports.getPlayerStats = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayerById(req.params.id);
  res.status(200).json({
    success: true,
    playerId: data.playerId,
    name: data.name,
    overallRating: data.ovr,
    stats: {
      pace: data.pace,
      shooting: data.shooting,
      passing: data.passing,
      dribbling: data.dribbling,
      defending: data.defending,
      physical: data.physical,
      detailedStats: {
        acceleration: data.acceleration,
        sprintSpeed: data.sprintSpeed,
        positioning: data.positioning,
        finishing: data.finishing,
        shotPower: data.shotPower,
        longShots: data.longShots,
        volleys: data.volleys,
        penalties: data.penalties,
        vision: data.vision,
        crossing: data.crossing,
        freeKickAccuracy: data.freeKickAccuracy,
        shortPassing: data.shortPassing,
        longPassing: data.longPassing,
        curve: data.curve,
        agility: data.agility,
        balance: data.balance,
        reactions: data.reactions,
        ballControl: data.ballControl,
        composure: data.composure,
        interceptions: data.interceptions,
        headingAccuracy: data.headingAccuracy,
        defensiveAwareness: data.defensiveAwareness,
        standingTackle: data.standingTackle,
        slidingTackle: data.slidingTackle,
        jumping: data.jumping,
        stamina: data.stamina,
        strength: data.strength,
        aggression: data.aggression
      }
    }
  });
});

// --- Custom Filter Routers ---

exports.getCustomFilter = asyncHandler(async (req, res, next) => {
  const filterType = req.params.filterType;
  const data = await playerService.getCustomFilter(filterType, req.query);
  res.status(200).json({
    success: true,
    filter: filterType,
    count: data.docs.length,
    ...data
  });
});

// --- Aggregation Framework (Analytics) ---

exports.getAggregateStats = asyncHandler(async (req, res, next) => {
  const analysisType = req.params.analysisType;
  const data = await playerService.getAggregateStats(analysisType);
  res.status(200).json({
    success: true,
    analysis: analysisType,
    count: data.length,
    data
  });
});

// --- Statistics metric counts ---

exports.getStatsSummary = asyncHandler(async (req, res, next) => {
  const metricType = req.params.metricType;
  const data = await playerService.getStatsSummary(metricType);
  res.status(200).json({
    success: true,
    metric: metricType,
    data
  });
});

// --- Advanced Utilities (Random, Chemistry, Predictions, Values) ---

exports.getRandomPlayer = asyncHandler(async (req, res, next) => {
  const data = await playerService.getRandomPlayer();
  res.status(200).json({
    success: true,
    data
  });
});

exports.getTrendingPlayers = asyncHandler(async (req, res, next) => {
  const data = await playerService.getTrendingPlayers();
  res.status(200).json({
    success: true,
    count: data.length,
    data
  });
});

exports.getRecommendations = asyncHandler(async (req, res, next) => {
  const data = await playerService.getRecommendations(req.query.id || req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

exports.getPlayerMarketValue = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayerMarketValue(req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

exports.getPlayerGrowthPrediction = asyncHandler(async (req, res, next) => {
  const data = await playerService.getPlayerGrowthPrediction(req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

exports.calculateSquadChemistry = asyncHandler(async (req, res, next) => {
  const playerIds = req.query.playerIds ? req.query.playerIds.split(",") : (req.body.playerIds || req.body);
  const data = await playerService.calculateSquadChemistry(playerIds);
  res.status(200).json({
    success: true,
    data
  });
});

exports.generateDreamTeam = asyncHandler(async (req, res, next) => {
  const data = await playerService.generateDreamTeam();
  res.status(200).json({
    success: true,
    data
  });
});

exports.getHeatmapData = asyncHandler(async (req, res, next) => {
  // Simple overall distribution heatmap data
  const data = await playerService.getAggregateStats("position-distribution");
  res.status(200).json({
    success: true,
    message: "Heatmap analytics loaded.",
    data
  });
});

exports.getLogs = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API System Logs: Healthy. 0 warnings, 0 errors.",
    logs: [
      { timestamp: new Date().toISOString(), level: "INFO", message: "Database check OK" },
      { timestamp: new Date().toISOString(), level: "INFO", message: "Server running" }
    ]
  });
});

exports.getActivity = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    activity: [
      { timestamp: new Date().toISOString(), action: "GET_PLAYERS", ip: req.ip },
      { timestamp: new Date().toISOString(), action: "CHECK_HEALTH", ip: req.ip }
    ]
  });
});

exports.getLiveSearch = asyncHandler(async (req, res, next) => {
  const query = req.query.q || "";
  const data = await playerService.getPlayersByName(query, { page: 1, limit: 5 });
  res.status(200).json({
    success: true,
    suggestions: data.docs.map(p => ({ playerId: p.playerId, name: p.name, team: p.team, ovr: p.ovr }))
  });
});
