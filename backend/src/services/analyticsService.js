const Player = require("../models/Player");
const pipelines = require("../utils/aggregationPipeline");

class AnalyticsService {
  async getTopRated(limit) {
    return await Player.aggregate(pipelines.buildTopPlayersPipeline("ovr", limit));
  }

  async getTopScorers(limit) {
    return await Player.aggregate(pipelines.buildTopPlayersPipeline("finishing", limit));
  }

  async getTopPassers(limit) {
    return await Player.aggregate(pipelines.buildTopPlayersPipeline("passing", limit));
  }

  async getTopDribblers(limit) {
    return await Player.aggregate(pipelines.buildTopPlayersPipeline("dribbling", limit));
  }

  async getTopDefenders(limit) {
    return await Player.aggregate(pipelines.buildTopPlayersPipeline("defending", limit));
  }

  async getTopTeams(limit) {
    return await Player.aggregate(pipelines.buildTopGroupsPipeline("team", limit));
  }

  async getTopLeagues(limit) {
    return await Player.aggregate(pipelines.buildTopGroupsPipeline("league", limit));
  }

  async getTopNations(limit) {
    return await Player.aggregate(pipelines.buildTopGroupsPipeline("nation", limit));
  }

  async getPositionDistribution() {
    return await Player.aggregate(pipelines.buildPositionDistributionPipeline());
  }
}

module.exports = new AnalyticsService();
