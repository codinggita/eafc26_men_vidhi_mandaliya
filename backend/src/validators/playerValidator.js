const Joi = require("joi");

const playerBodySchema = Joi.object({
  playerId: Joi.string().optional(),
  name: Joi.string().required(),
  rank: Joi.number().integer().required(),
  gender: Joi.string().valid("M", "F").default("M"),
  ovr: Joi.number().integer().min(0).max(99).required(),
  pace: Joi.number().integer().min(0).max(99).optional(),
  shooting: Joi.number().integer().min(0).max(99).optional(),
  passing: Joi.number().integer().min(0).max(99).optional(),
  dribbling: Joi.number().integer().min(0).max(99).optional(),
  defending: Joi.number().integer().min(0).max(99).optional(),
  physical: Joi.number().integer().min(0).max(99).optional(),
  age: Joi.number().integer().min(15).max(50).required(),
  preferredFoot: Joi.string().valid("Left", "Right").required(),
  position: Joi.string().required(),
  alternativePositions: Joi.array().items(Joi.string()).optional(),
  playStyles: Joi.array().items(Joi.string()).optional(),
  team: Joi.string().required(),
  league: Joi.string().required(),
  nation: Joi.string().required(),
  weakFoot: Joi.number().integer().min(1).max(5).optional(),
  skillMoves: Joi.number().integer().min(1).max(5).optional(),
  height: Joi.string().optional(),
  weight: Joi.string().optional(),
  card: Joi.string().optional(),
  url: Joi.string().uri().optional().allow("", null),
});

const playerUpdateSchema = playerBodySchema.fork(
  ["name", "rank", "ovr", "age", "preferredFoot", "position", "team", "league", "nation"],
  (schema) => schema.optional()
);

const playerQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  sort: Joi.string().optional(),
  q: Joi.string().optional(),
  search: Joi.string().optional(),
  team: Joi.string().optional(),
  league: Joi.string().optional(),
  nation: Joi.string().optional(),
  position: Joi.string().optional(),
  preferredFoot: Joi.string().valid("Left", "Right").optional(),
  minPace: Joi.number().integer().min(0).max(99).optional(),
  maxPace: Joi.number().integer().min(0).max(99).optional(),
  minShooting: Joi.number().integer().min(0).max(99).optional(),
  maxShooting: Joi.number().integer().min(0).max(99).optional(),
  minPassing: Joi.number().integer().min(0).max(99).optional(),
  maxPassing: Joi.number().integer().min(0).max(99).optional(),
  minDribbling: Joi.number().integer().min(0).max(99).optional(),
  maxDribbling: Joi.number().integer().min(0).max(99).optional(),
  minDefending: Joi.number().integer().min(0).max(99).optional(),
  maxDefending: Joi.number().integer().min(0).max(99).optional(),
  minPhysical: Joi.number().integer().min(0).max(99).optional(),
  maxPhysical: Joi.number().integer().min(0).max(99).optional(),
  minOvr: Joi.number().integer().min(0).max(99).optional(),
  maxOvr: Joi.number().integer().min(0).max(99).optional(),
  minAge: Joi.number().integer().min(15).max(50).optional(),
  maxAge: Joi.number().integer().min(15).max(50).optional(),
  playstyle: Joi.string().optional(),
  alternativePosition: Joi.string().optional(),
});

module.exports = {
  playerBodySchema,
  playerUpdateSchema,
  playerQuerySchema,
};
