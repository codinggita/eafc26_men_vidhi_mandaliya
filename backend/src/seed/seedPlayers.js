const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const connectDB = require("../config/db");
const Player = require("../models/Player");

// Helper to convert strings to numbers. Returns undefined for empty string or invalid input.
const toNum = (val) => {
  if (val === undefined || val === null) return undefined;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "") return undefined;
    const num = Number(trimmed);
    return isNaN(num) ? undefined : num;
  }
  if (typeof val === "number") {
    return isNaN(val) ? undefined : val;
  }
  return undefined;
};

// Helper to parse alternative positions and play styles strings into arrays.
const toArr = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "" || trimmed === "[]" || trimmed === '""' || trimmed === "''") return [];
    try {
      // Attempt JSON parse after replacing single quotes with double quotes
      const formatted = trimmed.replace(/'/g, '"');
      return JSON.parse(formatted);
    } catch (e) {
      // Regex fallback if JSON parsing fails
      const matches = trimmed.match(/'([^']+)'/g);
      if (matches) {
        return matches.map((m) => m.replace(/'/g, ""));
      }
      const doubleMatches = trimmed.match(/"([^"]+)"/g);
      if (doubleMatches) {
        return doubleMatches.map((m) => m.replace(/"/g, ""));
      }
      return [];
    }
  }
  return [];
};

const seedPlayers = async () => {
  const dataPath = path.join(__dirname, "data/EAFC26-Men.json");

  if (!fs.existsSync(dataPath)) {
    console.error(`\x1b[31mError: Dataset file not found at ${dataPath}\x1b[0m`);
    console.error(`\x1b[33mPlease add the complete "EAFC26-Men.json" file inside "src/seed/data/" first.\x1b[0m`);
    process.exit(1);
  }

  try {
    console.log("Loading dataset...");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const rawPlayers = JSON.parse(rawData);

    if (!Array.isArray(rawPlayers)) {
      throw new Error("Dataset is not a valid JSON array.");
    }

    console.log(`Loaded ${rawPlayers.length} player records from JSON.`);

    console.log("Transforming player data...");
    const transformedPlayers = rawPlayers.map((player) => ({
      playerId: player.ID ? String(player.ID).trim() : undefined,
      rank: toNum(player.Rank),
      name: player.Name,
      gender: player.GENDER,
      ovr: toNum(player.OVR),
      pace: toNum(player.PAC),
      shooting: toNum(player.SHO),
      passing: toNum(player.PAS),
      dribbling: toNum(player.DRI),
      defending: toNum(player.DEF),
      physical: toNum(player.PHY),
      acceleration: toNum(player.Acceleration),
      sprintSpeed: toNum(player["Sprint Speed"]),
      positioning: toNum(player.Positioning),
      finishing: toNum(player.Finishing),
      shotPower: toNum(player["Shot Power"]),
      longShots: toNum(player["Long Shots"]),
      volleys: toNum(player.Volleys),
      penalties: toNum(player.Penalties),
      vision: toNum(player.Vision),
      crossing: toNum(player.Crossing),
      freeKickAccuracy: toNum(player["Free Kick Accuracy"]),
      shortPassing: toNum(player["Short Passing"]),
      longPassing: toNum(player["Long Passing"]),
      curve: toNum(player.Curve),
      detailedDribbling: toNum(player.Dribbling),
      agility: toNum(player.Agility),
      balance: toNum(player.Balance),
      reactions: toNum(player.Reactions),
      ballControl: toNum(player["Ball Control"]),
      composure: toNum(player.Composure),
      interceptions: toNum(player.Interceptions),
      headingAccuracy: toNum(player["Heading Accuracy"]),
      defensiveAwareness: toNum(player["Def Awareness"]),
      standingTackle: toNum(player["Standing Tackle"]),
      slidingTackle: toNum(player["Sliding Tackle"]),
      jumping: toNum(player.Jumping),
      stamina: toNum(player.Stamina),
      strength: toNum(player.Strength),
      aggression: toNum(player.Aggression),
      position: player.Position,
      weakFoot: toNum(player["Weak foot"]),
      skillMoves: toNum(player["Skill moves"]),
      preferredFoot: player["Preferred foot"],
      height: player.Height,
      weight: player.Weight,
      alternativePositions: toArr(player["Alternative positions"]),
      age: toNum(player.Age),
      nation: player.Nation,
      league: player.League,
      team: player.Team,
      playStyles: toArr(player["play style"]),
      url: player.url,
      gkDiving: toNum(player["GK Diving"]),
      gkHandling: toNum(player["GK Handling"]),
      gkKicking: toNum(player["GK Kicking"]),
      gkPositioning: toNum(player["GK Positioning"]),
      gkReflexes: toNum(player["GK Reflexes"]),
      card: player.card,
    }));

    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing existing players...");
    await Player.deleteMany({});
    console.log("Existing players cleared.");

    console.log("Inserting transformed player records...");
    const inserted = await Player.insertMany(transformedPlayers);
    console.log(`Players seeded successfully. Seeded count: ${inserted.length}`);

  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  } finally {
    console.log("Closing database connection...");
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedPlayers();
