const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "site");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ----------------------------------------------------
// Core Route Data Definitions
// ----------------------------------------------------
const routes = [
  // 1. Basic CRUD
  {
    group: "Basic CRUD",
    name: "Get All Players",
    method: "GET",
    path: "/players",
    description: "Fetch all football player records from dataset with support for pagination, sorting, search, and attribute filtering.",
    auth: false,
    queryParams: [
      { name: "page", type: "integer", default: 1, description: "Page number for pagination" },
      { name: "limit", type: "integer", default: 10, description: "Number of records per page" },
      { name: "sort", type: "string", description: "Field to sort by (e.g. ovr, pace, shooting, age, rank, name). Append -desc or -asc." },
      { name: "search", type: "string", description: "Search query for keyword match against name, team, league, nation" },
      { name: "team", type: "string", description: "Filter players by club team name" },
      { name: "league", type: "string", description: "Filter players by league name" },
      { name: "nation", type: "string", description: "Filter players by country name" },
      { name: "position", type: "string", description: "Filter players by playing position (e.g. ST, RW, LW, CM, CB, GK)" },
      { name: "minPace", type: "integer", description: "Minimum pace rating filter" },
      { name: "minShooting", type: "integer", description: "Minimum shooting rating filter" },
      { name: "minPassing", type: "integer", description: "Minimum passing rating filter" },
      { name: "minDribbling", type: "integer", description: "Minimum dribbling rating filter" },
      { name: "minDefending", type: "integer", description: "Minimum defending rating filter" },
      { name: "minPhysical", type: "integer", description: "Minimum physical rating filter" }
    ],
    response: {
      success: true,
      message: "Players fetched successfully",
      count: 2,
      pagination: { page: 1, limit: 10, totalPages: 120, totalPlayers: 1198 },
      data: [
        { id: "231747", name: "Kylian Mbappé", rank: 1, overall: 91, age: 26, team: "Real Madrid", league: "LALIGA EA SPORTS", nation: "France", position: "ST", preferredFoot: "Right", pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78 },
        { id: "158023", name: "Lionel Messi", rank: 2, overall: 90, age: 38, team: "Inter Miami", league: "MLS", nation: "Argentina", position: "RW", preferredFoot: "Left", pace: 80, shooting: 87, passing: 90, dribbling: 92, defending: 33, physical: 64 }
      ]
    }
  },
  {
    group: "Basic CRUD",
    name: "Get Player by ID",
    method: "GET",
    path: "/players/:id",
    description: "Fetch single player details using the unique player ID.",
    auth: false,
    params: [
      { name: "id", type: "string", required: true, description: "The player's unique ID (e.g. 231747)" }
    ],
    response: {
      success: true,
      message: "Player fetched successfully",
      data: {
        id: "231747",
        name: "Kylian Mbappé",
        rank: 1,
        overall: 91,
        age: 26,
        team: "Real Madrid",
        league: "LALIGA EA SPORTS",
        nation: "France",
        position: "ST",
        alternativePositions: ["LW", "CF"],
        preferredFoot: "Right",
        weakFoot: 4,
        skillMoves: 5,
        gender: "Men",
        pace: 97,
        shooting: 90,
        passing: 80,
        dribbling: 92,
        defending: 36,
        physical: 78,
        playstyles: ["Quick Step", "Rapid", "Finesse Shot"]
      }
    }
  },
  {
    group: "Basic CRUD",
    name: "Create Player",
    method: "POST",
    path: "/players",
    description: "Add a new football player record to the dataset.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    requestBody: {
      name: "Erling Haaland",
      rank: 3,
      overall: 91,
      age: 25,
      team: "Manchester City",
      league: "Premier League",
      nation: "Norway",
      position: "ST",
      preferredFoot: "Left",
      pace: 89,
      shooting: 92,
      passing: 68,
      dribbling: 80,
      defending: 45,
      physical: 88
    },
    response: {
      success: true,
      message: "Player record created successfully",
      data: {
        id: "998822",
        name: "Erling Haaland",
        rank: 3,
        overall: 91,
        age: 25,
        team: "Manchester City",
        league: "Premier League",
        nation: "Norway",
        position: "ST",
        preferredFoot: "Left",
        pace: 89,
        shooting: 92,
        passing: 68,
        dribbling: 80,
        defending: 45,
        physical: 88
      }
    }
  },
  {
    group: "Basic CRUD",
    name: "Replace Player (Full Update)",
    method: "PUT",
    path: "/players/:id",
    description: "Replace complete player record fields using player ID.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "string", required: true, description: "Unique player ID" }
    ],
    requestBody: {
      name: "Kylian Mbappé Lottin",
      rank: 1,
      overall: 92,
      age: 27,
      team: "Real Madrid",
      league: "LALIGA EA SPORTS",
      nation: "France",
      position: "ST",
      preferredFoot: "Right",
      pace: 98,
      shooting: 91,
      passing: 82,
      dribbling: 93,
      defending: 36,
      physical: 79
    },
    response: {
      success: true,
      message: "Player replaced successfully",
      data: {
        id: "231747",
        name: "Kylian Mbappé Lottin",
        rank: 1,
        overall: 92,
        age: 27,
        team: "Real Madrid",
        league: "LALIGA EA SPORTS",
        nation: "France",
        position: "ST",
        preferredFoot: "Right",
        pace: 98,
        shooting: 91,
        passing: 82,
        dribbling: 93,
        defending: 36,
        physical: 79
      }
    }
  },
  {
    group: "Basic CRUD",
    name: "Update Player (Partial)",
    method: "PATCH",
    path: "/players/:id",
    description: "Update specific player fields rather than replacing the whole document.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "string", required: true, description: "Unique player ID" }
    ],
    requestBody: {
      team: "Real Madrid CF",
      overall: 92
    },
    response: {
      success: true,
      message: "Player updated successfully",
      data: {
        id: "231747",
        name: "Kylian Mbappé",
        team: "Real Madrid CF",
        overall: 92
      }
    }
  },
  {
    group: "Basic CRUD",
    name: "Delete Player",
    method: "DELETE",
    path: "/players/:id",
    description: "Delete player record from dataset by unique player ID.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "string", required: true, description: "Unique player ID" }
    ],
    response: {
      success: true,
      message: "Player with ID 231747 has been deleted successfully"
    }
  },
  {
    group: "Basic CRUD",
    name: "Check Player Existence",
    method: "GET",
    path: "/players/exists/:id",
    description: "Check whether player exists in database or not without fetching entire model content.",
    auth: false,
    params: [
      { name: "id", type: "string", required: true, description: "Unique player ID" }
    ],
    response: {
      success: true,
      exists: true,
      id: "231747"
    }
  },
  {
    group: "Basic CRUD",
    name: "Bulk Create Players",
    method: "POST",
    path: "/players/bulk-create",
    description: "Insert multiple player records together in one database transaction.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    requestBody: [
      { name: "Bukayo Saka", rank: 15, overall: 87, team: "Arsenal", league: "Premier League", nation: "England", position: "RW" },
      { name: "Martin Ødegaard", rank: 16, overall: 89, team: "Arsenal", league: "Premier League", nation: "Norway", position: "CAM" }
    ],
    response: {
      success: true,
      message: "2 players created in bulk successfully",
      insertedCount: 2,
      ids: ["887711", "887712"]
    }
  },
  {
    group: "Basic CRUD",
    name: "Bulk Update Players",
    method: "PATCH",
    path: "/players/bulk-update",
    description: "Update multiple player records together using bulk transactions.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    requestBody: [
      { id: "887711", team: "Arsenal FC" },
      { id: "887712", overall: 90 }
    ],
    response: {
      success: true,
      message: "Bulk updates applied successfully",
      modifiedCount: 2
    }
  },
  {
    group: "Basic CRUD",
    name: "Bulk Delete Players",
    method: "DELETE",
    path: "/players/bulk-delete",
    description: "Delete multiple player records simultaneously by list of IDs.",
    auth: true,
    headers: [
      { name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }
    ],
    requestBody: {
      ids: ["887711", "887712"]
    },
    response: {
      success: true,
      message: "Bulk delete executed successfully",
      deletedCount: 2
    }
  },

  // 2. Player Information
  {
    group: "Player Information",
    name: "Get Players by Name",
    method: "GET",
    path: "/players/name/:name",
    description: "Fetch player details using a name route parameter.",
    auth: false,
    params: [{ name: "name", type: "string", required: true, description: "Player name search segment (e.g. Salah)" }],
    response: {
      success: true,
      message: "Players matching name fetched successfully",
      data: [{ id: "209331", name: "Mohamed Salah", team: "Liverpool", position: "RW", overall: 89 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Player by Rank",
    method: "GET",
    path: "/players/rank/:rank",
    description: "Fetch player using global rating rank.",
    auth: false,
    params: [{ name: "rank", type: "integer", required: true, description: "Global numeric rank (e.g. 1)" }],
    response: {
      success: true,
      data: { id: "231747", name: "Kylian Mbappé", rank: 1, overall: 91 }
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Team",
    method: "GET",
    path: "/players/team/:team",
    description: "Fetch players belonging to a specific club team.",
    auth: false,
    params: [{ name: "team", type: "string", required: true, description: "Club team name (e.g. Real Madrid)" }],
    response: {
      success: true,
      team: "Real Madrid",
      count: 24,
      data: [{ id: "231747", name: "Kylian Mbappé", position: "ST", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by League",
    method: "GET",
    path: "/players/league/:league",
    description: "Fetch players belonging to a specific league.",
    auth: false,
    params: [{ name: "league", type: "string", required: true, description: "League name (e.g. Premier League)" }],
    response: {
      success: true,
      league: "Premier League",
      count: 450,
      data: [{ id: "209331", name: "Mohamed Salah", overall: 89 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Nation",
    method: "GET",
    path: "/players/nation/:nation",
    description: "Fetch players by nationality.",
    auth: false,
    params: [{ name: "nation", type: "string", required: true, description: "Nation name (e.g. France)" }],
    response: {
      success: true,
      nation: "France",
      count: 98,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Position",
    method: "GET",
    path: "/players/position/:position",
    description: "Fetch players using their primary playing position.",
    auth: false,
    params: [{ name: "position", type: "string", required: true, description: "Playing position code (e.g. ST, CB, GK)" }],
    response: {
      success: true,
      position: "ST",
      count: 142,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Age",
    method: "GET",
    path: "/players/age/:age",
    description: "Fetch players using age parameter.",
    auth: false,
    params: [{ name: "age", type: "integer", required: true, description: "Player age in years (e.g. 26)" }],
    response: {
      success: true,
      age: 26,
      count: 75,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Gender",
    method: "GET",
    path: "/players/gender/:gender",
    description: "Fetch players using gender category.",
    auth: false,
    params: [{ name: "gender", type: "string", required: true, description: "Gender classification ('Men' or 'Women')" }],
    response: {
      success: true,
      gender: "Men",
      count: 1200,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Playstyle",
    method: "GET",
    path: "/players/playstyle/:style",
    description: "Fetch players filtered by a specific play style attribute.",
    auth: false,
    params: [{ name: "style", type: "string", required: true, description: "Play style (e.g. Rapid, Finesse Shot, Whipped Cross)" }],
    response: {
      success: true,
      playstyle: "Rapid",
      count: 42,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Players by Preferred Foot",
    method: "GET",
    path: "/players/preferred-foot/:foot",
    description: "Fetch players based on their preferred kicking foot.",
    auth: false,
    params: [{ name: "foot", type: "string", required: true, description: "Foot selection ('Left' or 'Right')" }],
    response: {
      success: true,
      preferredFoot: "Left",
      count: 245,
      data: [{ id: "158023", name: "Lionel Messi", overall: 90 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Rated Players",
    method: "GET",
    path: "/players/top-rated",
    description: "Fetch highest rated players in descending overall score sequence.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "231747", name: "Kylian Mbappé", overall: 91, rank: 1 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Paced Players",
    method: "GET",
    path: "/players/top-paced",
    description: "Fetch fastest players with highest pace attributes.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "231747", name: "Kylian Mbappé", pace: 97, overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Dribblers",
    method: "GET",
    path: "/players/top-dribblers",
    description: "Fetch best dribbling players.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "158023", name: "Lionel Messi", dribbling: 92, overall: 90 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Finishers",
    method: "GET",
    path: "/players/top-finishers",
    description: "Fetch best finishing / shooting score players.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "231747", name: "Erling Haaland", shooting: 92, overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Passers",
    method: "GET",
    path: "/players/top-passers",
    description: "Fetch best passing score players.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "182521", name: "Toni Kroos", passing: 90, overall: 90 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Defenders",
    method: "GET",
    path: "/players/top-defenders",
    description: "Fetch best defensive attributes players.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "203775", name: "Virgil van Dijk", defending: 89, overall: 89 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Physical Players",
    method: "GET",
    path: "/players/top-physical",
    description: "Fetch strongest physical rating players.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "231747", name: "Erling Haaland", physical: 88, overall: 91 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Top Youngsters",
    method: "GET",
    path: "/players/top-youngsters",
    description: "Fetch highest rated young players (under 21).",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "263620", name: "Jude Bellingham", age: 20, overall: 90 }]
    }
  },
  {
    group: "Player Information",
    name: "Get Recent Players",
    method: "GET",
    path: "/players/recent",
    description: "Fetch recently added player records in the database.",
    auth: false,
    queryParams: [{ name: "limit", type: "integer", default: 10, description: "Result count limit" }],
    response: {
      success: true,
      data: [{ id: "998822", name: "Erling Haaland", overall: 91, createdAt: "2026-07-06T16:00:00.000Z" }]
    }
  },

  // 3. Search APIs
  {
    group: "Search APIs",
    name: "Search Players",
    method: "GET",
    path: "/search/players",
    description: "Search players using keyword matching against names, clubs, leagues, nations, and playstyles.",
    auth: false,
    queryParams: [
      { name: "q", type: "string", required: true, description: "The search keyword (e.g. salah, mbappe, real madrid)" }
    ],
    response: {
      success: true,
      query: "salah",
      resultsCount: 1,
      data: [{ id: "209331", name: "Mohamed Salah", team: "Liverpool", position: "RW", overall: 89 }]
    }
  },

  // 4. Analytics APIs
  {
    group: "Analytics APIs",
    name: "Top Rated Analytics",
    method: "GET",
    path: "/analytics/players/top-rated",
    description: "Fetch highest rated player records structured for analytical visualization charts.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      metric: "rating",
      data: [
        { name: "Kylian Mbappé", rating: 91, team: "Real Madrid" },
        { name: "Erling Haaland", rating: 91, team: "Manchester City" }
      ]
    }
  },
  {
    group: "Analytics APIs",
    name: "Youngest Players Analytics",
    method: "GET",
    path: "/analytics/players/youngest",
    description: "Fetch youngest players data for statistical age plots.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Lamine Yamal", age: 16, overall: 81, team: "FC Barcelona" }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Oldest Players Analytics",
    method: "GET",
    path: "/analytics/players/oldest",
    description: "Analyze oldest active player records.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Cristiano Ronaldo", age: 41, overall: 86, team: "Al Nassr" }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Scorers Analytics",
    method: "GET",
    path: "/analytics/players/top-scorers",
    description: "Analyze top shooting/finishing performance scores.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Erling Haaland", shooting: 92, overall: 91 }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Assisters Analytics",
    method: "GET",
    path: "/analytics/players/top-assisters",
    description: "Analyze players with the best passing/vision stats.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Kevin De Bruyne", passing: 94, vision: 95 }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Dribblers Analytics",
    method: "GET",
    path: "/analytics/players/top-dribblers",
    description: "Analyze best dribbling execution performance metrics.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Lionel Messi", dribbling: 92, agility: 91 }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Defenders Analytics",
    method: "GET",
    path: "/analytics/players/top-defenders",
    description: "Analyze defensive structure metrics.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Virgil van Dijk", defending: 89, interceptions: 90 }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Physical Analytics",
    method: "GET",
    path: "/analytics/players/top-physical",
    description: "Analyze strength, stamina, and physical scores.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [{ name: "Erling Haaland", physical: 88, strength: 93 }]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Playstyles Analytics",
    method: "GET",
    path: "/analytics/players/top-playstyles",
    description: "Analyze play style distributions across high overall players.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      playstyles: { "Finesse Shot": 240, "Rapid": 180, "Interstellar": 45 }
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Teams Analytics",
    method: "GET",
    path: "/analytics/players/top-teams",
    description: "Analyze teams with highest average ratings.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [
        { team: "Real Madrid", averageOvr: 85.4, starCount: 12 },
        { team: "Manchester City", averageOvr: 85.1, starCount: 10 }
      ]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Leagues Analytics",
    method: "GET",
    path: "/analytics/players/top-leagues",
    description: "Analyze leagues with highest average ratings.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [
        { league: "Premier League", averageOvr: 81.2, starCount: 88 },
        { league: "LALIGA EA SPORTS", averageOvr: 80.5, starCount: 65 }
      ]
    }
  },
  {
    group: "Analytics APIs",
    name: "Top Nations Analytics",
    method: "GET",
    path: "/analytics/players/top-nations",
    description: "Analyze nations with highest average ratings.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: [
        { nation: "France", averageOvr: 82.3 },
        { nation: "Brazil", averageOvr: 81.9 }
      ]
    }
  },

  // 5. Statistics APIs
  {
    group: "Statistics APIs",
    name: "Get Players Count",
    method: "GET",
    path: "/stats/players/count",
    description: "Calculate total player records registered in database.",
    auth: false,
    response: {
      success: true,
      totalPlayers: 1198,
      genderSplits: { Men: 950, Women: 248 }
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Average Rating",
    method: "GET",
    path: "/stats/players/average-rating",
    description: "Calculate average rating values for database records.",
    auth: false,
    response: {
      success: true,
      averageRating: 78.42
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Highest Rated Player",
    method: "GET",
    path: "/stats/players/highest-rated",
    description: "Identify and fetch player with highest overall rating.",
    auth: false,
    response: {
      success: true,
      player: { id: "231747", name: "Kylian Mbappé", overall: 91 }
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Highest Paced Player",
    method: "GET",
    path: "/stats/players/highest-paced",
    description: "Identify and fetch player with highest pace rating.",
    auth: false,
    response: {
      success: true,
      player: { id: "231747", name: "Kylian Mbappé", pace: 97 }
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Players Count by Team",
    method: "GET",
    path: "/stats/players/team-count",
    description: "Get total counts of players grouped by club team.",
    auth: false,
    response: {
      success: true,
      data: { "Real Madrid": 28, "Manchester City": 26, "FC Barcelona": 29 }
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Players Count by League",
    method: "GET",
    path: "/stats/players/league-count",
    description: "Get counts of players grouped by league.",
    auth: false,
    response: {
      success: true,
      data: { "Premier League": 450, "LALIGA EA SPORTS": 420, "Serie A": 380 }
    }
  },
  {
    group: "Statistics APIs",
    name: "Get Players Count by Nation",
    method: "GET",
    path: "/stats/players/nation-count",
    description: "Get counts of players grouped by nation.",
    auth: false,
    response: {
      success: true,
      data: { "France": 120, "Brazil": 140, "Spain": 150 }
    }
  },

  // 6. Authentication
  {
    group: "Authentication",
    name: "Register User",
    method: "POST",
    path: "/auth/register",
    description: "Register a new user account inside the database.",
    auth: false,
    requestBody: {
      name: "Vidhi Mandaliya",
      email: "vidhi@example.com",
      password: "password123"
    },
    response: {
      success: true,
      message: "User registered successfully",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data",
      user: {
        id: "usr_998877",
        name: "Vidhi Mandaliya",
        email: "vidhi@example.com",
        role: "user"
      }
    }
  },
  {
    group: "Authentication",
    name: "Login User",
    method: "POST",
    path: "/auth/login",
    description: "Log in an existing user and return a JWT access token.",
    auth: false,
    requestBody: {
      email: "vidhi@example.com",
      password: "password123"
    },
    response: {
      success: true,
      message: "Logged in successfully",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data",
      user: {
        id: "usr_998877",
        name: "Vidhi Mandaliya",
        email: "vidhi@example.com",
        role: "user"
      }
    }
  },
  {
    group: "Authentication",
    name: "Logout User",
    method: "POST",
    path: "/auth/logout",
    description: "Clear session session tokens and log out user.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "Logged out successfully"
    }
  },
  {
    group: "Authentication",
    name: "Get Profile",
    method: "GET",
    path: "/auth/profile",
    description: "Fetch profile metadata of the currently authenticated user.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      data: {
        id: "usr_998877",
        name: "Vidhi Mandaliya",
        email: "vidhi@example.com",
        role: "user",
        createdAt: "2026-07-06T16:00:00.000Z"
      }
    }
  },
  {
    group: "Authentication",
    name: "Update Profile",
    method: "PATCH",
    path: "/auth/profile",
    description: "Update fields in the active user's account profile.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    requestBody: {
      name: "Vidhi Mandaliya (Updated)"
    },
    response: {
      success: true,
      message: "Profile updated successfully",
      data: {
        id: "usr_998877",
        name: "Vidhi Mandaliya (Updated)",
        email: "vidhi@example.com",
        role: "user"
      }
    }
  },
  {
    group: "Authentication",
    name: "Delete Profile",
    method: "DELETE",
    path: "/auth/profile",
    description: "Delete the active authenticated user profile account permanently.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "Account deleted successfully"
    }
  },
  {
    group: "Authentication",
    name: "Forgot Password",
    method: "POST",
    path: "/auth/forgot-password",
    description: "Trigger password recovery request by email.",
    auth: false,
    requestBody: {
      email: "vidhi@example.com"
    },
    response: {
      success: true,
      message: "Password recovery email sent successfully. Please check your inbox."
    }
  },
  {
    group: "Authentication",
    name: "Reset Password",
    method: "POST",
    path: "/auth/reset-password",
    description: "Reset password using the reset token received via email.",
    auth: false,
    requestBody: {
      token: "reset_token_123456",
      newPassword: "newsecurepassword123"
    },
    response: {
      success: true,
      message: "Password reset successfully. You can now log in with your new password."
    }
  },
  {
    group: "Authentication",
    name: "Change Password",
    method: "POST",
    path: "/auth/change-password",
    description: "Change active account password with current credentials.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    requestBody: {
      currentPassword: "password123",
      newPassword: "newsecurepassword123"
    },
    response: {
      success: true,
      message: "Password updated successfully"
    }
  },
  {
    group: "Authentication",
    name: "Verify Email",
    method: "POST",
    path: "/auth/verify-email",
    description: "Verify user email using verification token.",
    auth: false,
    requestBody: {
      token: "verification_token_778899"
    },
    response: {
      success: true,
      message: "Email verified successfully"
    }
  },
  {
    group: "Authentication",
    name: "Send OTP",
    method: "POST",
    path: "/auth/send-otp",
    description: "Generate and send a temporary One-Time Password for authentication.",
    auth: false,
    requestBody: {
      email: "vidhi@example.com"
    },
    response: {
      success: true,
      message: "OTP sent successfully to registered email address"
    }
  },
  {
    group: "Authentication",
    name: "Verify OTP",
    method: "POST",
    path: "/auth/verify-otp",
    description: "Verify OTP code sequence for MFA setup.",
    auth: false,
    requestBody: {
      email: "vidhi@example.com",
      otp: "123456"
    },
    response: {
      success: true,
      message: "OTP verified successfully",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data"
    }
  },

  // 7. JWT APIs
  {
    group: "JWT APIs",
    name: "Get JWT Profile",
    method: "GET",
    path: "/jwt/profile",
    description: "Access profile information using JWT verification.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "JWT profile access granted",
      data: { id: "usr_998877", email: "vidhi@example.com", verified: true }
    }
  },
  {
    group: "JWT APIs",
    name: "Get JWT Dashboard",
    method: "GET",
    path: "/jwt/dashboard",
    description: "Access user dashboard statistics using JWT verification.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "JWT Dashboard access authorized",
      stats: { totalSearches: 12, favoritePlayersCount: 5 }
    }
  },
  {
    group: "JWT APIs",
    name: "Generate JWT Token",
    method: "POST",
    path: "/jwt/generate-token",
    description: "Explicit route to generate a fresh JWT token for testing.",
    auth: false,
    requestBody: {
      userId: "usr_998877",
      role: "user"
    },
    response: {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data",
      expiresIn: "30d"
    }
  },
  {
    group: "JWT APIs",
    name: "Verify JWT Token",
    method: "POST",
    path: "/jwt/verify-token",
    description: "Validate structure and expiration details of a JWT token.",
    auth: false,
    requestBody: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data"
    },
    response: {
      success: true,
      valid: true,
      payload: { userId: "usr_998877", role: "user", iat: 1783382400, exp: 1785974400 }
    }
  },
  {
    group: "JWT APIs",
    name: "Refresh JWT Token",
    method: "POST",
    path: "/jwt/refresh-token",
    description: "Renew access tokens using valid refresh tokens.",
    auth: false,
    requestBody: {
      refreshToken: "refresh_token_string_889900"
    },
    response: {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fresh_token_data"
    }
  },
  {
    group: "JWT APIs",
    name: "Revoke JWT Token",
    method: "DELETE",
    path: "/jwt/revoke-token",
    description: "Add a token to the blacklist/revoke session tokens.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    requestBody: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data"
    },
    response: {
      success: true,
      message: "Token has been revoked successfully"
    }
  },
  {
    group: "JWT APIs",
    name: "JWT Admin Route",
    method: "GET",
    path: "/jwt/admin",
    description: "Retrieve dashboard configs restricted to administrator permissions.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "Welcome Admin! Access granted.",
      systemHealth: "Optimal"
    }
  },

  // 8. Middleware
  {
    group: "Middleware",
    name: "Logger Middleware Tester",
    method: "GET",
    path: "/middleware/logger",
    description: "Practice endpoint triggers system console request logger.",
    auth: false,
    response: {
      success: true,
      message: "Logger middleware executed and log recorded successfully.",
      log: "GET /middleware/logger - 200 OK - Xms"
    }
  },
  {
    group: "Middleware",
    name: "Auth Middleware Tester",
    method: "GET",
    path: "/middleware/auth",
    description: "Practice authorization middleware routing helper.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "Authentication successful, token validated.",
      userId: "usr_998877"
    }
  },
  {
    group: "Middleware",
    name: "Rate Limiter Tester",
    method: "GET",
    path: "/middleware/rate-limit",
    description: "Verify rate limiter throttling configurations.",
    auth: false,
    response: {
      success: true,
      message: "Rate limit criteria satisfies, request accepted.",
      limits: { max: 100, remaining: 99, resetSeconds: 59 }
    }
  },
  {
    group: "Middleware",
    name: "Error Handler Tester",
    method: "GET",
    path: "/middleware/error-handler",
    description: "Trigger a test mock error to verify global exception formats.",
    auth: false,
    response: {
      success: false,
      message: "Test error triggered successfully",
      stack: "Error: Test error triggered\n    at errorHandlerController (index.js:42:9)..."
    }
  },
  {
    group: "Middleware",
    name: "Request Timer Tester",
    method: "GET",
    path: "/middleware/request-time",
    description: "Test execution speed tracking headers (`X-Response-Time`).",
    auth: false,
    response: {
      success: true,
      message: "Request processing speed logged.",
      responseTime: "3.42ms"
    }
  },
  {
    group: "Middleware",
    name: "Role Check Tester",
    method: "GET",
    path: "/middleware/role-check",
    description: "Practice checking permissions bounds of active user profiles.",
    auth: true,
    headers: [{ name: "Authorization", type: "string", required: true, value: "Bearer <token>", description: "JWT authorization token" }],
    response: {
      success: true,
      message: "Role check passed: User has administrative privileges",
      role: "admin"
    }
  },
  {
    group: "Middleware",
    name: "Validation Tester",
    method: "GET",
    path: "/middleware/validation",
    description: "Practice payload verification schemas validator triggers.",
    auth: false,
    queryParams: [{ name: "email", type: "string", required: true, description: "Email to validate" }],
    response: {
      success: true,
      message: "Query parameters matched validation patterns perfectly."
    }
  },
  {
    group: "Middleware",
    name: "Sanitizer Tester",
    method: "GET",
    path: "/middleware/sanitizer",
    description: "Practice sanitization script escaping and database query sanitizing routines.",
    auth: false,
    queryParams: [{ name: "query", type: "string", required: true, description: "Input parameter query containing potential XSS script code" }],
    response: {
      success: true,
      original: "<script>alert('xss')</script>",
      sanitized: "&lt;script&gt;alert('xss')&lt;/script&gt;"
    }
  },

  // 9. Advanced APIs
  {
    group: "Advanced APIs",
    name: "Get Random Player",
    method: "GET",
    path: "/players/random",
    description: "Fetch random football player record from the dataset.",
    auth: false,
    response: {
      success: true,
      data: { id: "209331", name: "Mohamed Salah", overall: 89, team: "Liverpool" }
    }
  },
  {
    group: "Advanced APIs",
    name: "Get Trending Players",
    method: "GET",
    path: "/players/trending",
    description: "Fetch trending football player profiles based on recent database views or searches.",
    auth: false,
    response: {
      success: true,
      data: [
        { id: "231747", name: "Kylian Mbappé", trendingScore: 99.4 },
        { id: "263620", name: "Jude Bellingham", trendingScore: 98.1 }
      ]
    }
  },
  {
    group: "Advanced APIs",
    name: "Get Recommendations",
    method: "GET",
    path: "/players/recommendations",
    description: "Recommend similar players using rating profiles and position matching.",
    auth: false,
    queryParams: [
      { name: "id", type: "string", required: true, description: "The player ID to base recommendations on" }
    ],
    response: {
      success: true,
      targetPlayer: "Kylian Mbappé",
      recommendations: [
        { id: "239085", name: "Erling Haaland", similarity: 0.92 },
        { id: "209331", name: "Mohamed Salah", similarity: 0.88 }
      ]
    }
  },
  {
    group: "Advanced APIs",
    name: "Predict Player Growth",
    method: "GET",
    path: "/players/predictions",
    description: "Predict future stats and overall growth trends based on age and potential.",
    auth: false,
    queryParams: [
      { name: "id", type: "string", required: true, description: "Player ID for potential predictions" }
    ],
    response: {
      success: true,
      playerName: "Jude Bellingham",
      currentOverall: 90,
      predictedOverall: { age22: 92, age24: 94, age26: 95 }
    }
  },
  {
    group: "Advanced APIs",
    name: "Get Market Value",
    method: "GET",
    path: "/players/market-value",
    description: "Estimate market value based on stats, age, and reputation.",
    auth: false,
    queryParams: [
      { name: "id", type: "string", required: true, description: "Player ID to retrieve estimated value" }
    ],
    response: {
      success: true,
      playerName: "Kylian Mbappé",
      estimatedValueEUR: 180000000,
      weeklyWageEUR: 600000
    }
  },
  {
    group: "Advanced APIs",
    name: "Dream Team Builder",
    method: "GET",
    path: "/players/dream-team",
    description: "Generate best possible dream team based on overall ratings.",
    auth: false,
    queryParams: [
      { name: "formation", type: "string", default: "4-3-3", description: "Team formation layout code" }
    ],
    response: {
      success: true,
      formation: "4-3-3",
      averageOvr: 90.2,
      squad: {
        attack: ["Vinícius Jr.", "Erling Haaland", "Kylian Mbappé"],
        midfield: ["Kevin De Bruyne", "Rodri", "Jude Bellingham"],
        defense: ["Theo Hernández", "Virgil van Dijk", "Rúben Dias", "Daniel Carvajal"],
        goalkeeper: "Thibaut Courtois"
      }
    }
  },
  {
    group: "Advanced APIs",
    name: "Team Builder Utility",
    method: "GET",
    path: "/players/team-builder",
    description: "Build custom football squad configurations using selected players.",
    auth: false,
    queryParams: [
      { name: "ids", type: "string", required: true, description: "Comma-separated list of player IDs (e.g. 231747,158023)" }
    ],
    response: {
      success: true,
      totalPlayers: 2,
      averageOvr: 90.5,
      squad: [
        { id: "231747", name: "Kylian Mbappé", overall: 91, position: "ST" },
        { id: "158023", name: "Lionel Messi", overall: 90, position: "RW" }
      ]
    }
  },
  {
    group: "Advanced APIs",
    name: "Calculate Squad Chemistry",
    method: "GET",
    path: "/players/chemistry",
    description: "Calculate chemistry connections (clubs, leagues, nations) for a custom squad.",
    auth: false,
    queryParams: [
      { name: "ids", type: "string", required: true, description: "Comma-separated list of player IDs" }
    ],
    response: {
      success: true,
      chemistryPoints: 31,
      maxChemistry: 33,
      breakdown: { teamLinks: 10, leagueLinks: 12, nationLinks: 9 }
    }
  },
  {
    group: "Advanced APIs",
    name: "Get Stats Heatmap",
    method: "GET",
    path: "/players/heatmap",
    description: "Generate stats distribution coordinate arrays for plotting radial comparison spider graphs.",
    auth: false,
    queryParams: [
      { name: "id", type: "string", required: true, description: "Player ID for heatmap generation" }
    ],
    response: {
      success: true,
      playerName: "Lionel Messi",
      radarData: {
        labels: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
        values: [80, 87, 90, 92, 33, 64]
      }
    }
  },
  {
    group: "Advanced APIs",
    name: "Live Search API",
    method: "GET",
    path: "/players/live-search",
    description: "Ultra-fast typeahead endpoints returning simple name lists for autocomplete controls.",
    auth: false,
    queryParams: [
      { name: "query", type: "string", required: true, description: "Prefix input strings" }
    ],
    response: {
      success: true,
      suggestions: [
        { id: "209331", name: "Mohamed Salah", team: "Liverpool" },
        { id: "264321", name: "Mohamed Kudus", team: "West Ham" }
      ]
    }
  }
];

// Helper to sanitize path for OpenAPI schema
function getOpenApiPath(pathStr) {
  // Replace :id with {id}
  return pathStr.replace(/:(\w+)/g, "{$1}");
}

// ----------------------------------------------------
// Generate OpenAPI Spec JSON
// ----------------------------------------------------
function buildOpenApiSpec() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "EAFC 26 Player Analytics API Documentation",
      version: "1.0.0",
      description: "Complete professional interactive documentation for the EAFC 26 Player Analytics API. This backend service operates on player databases, authentication pipelines, aggregation pipelines, performance statistics, and validation middleware. All endpoints are fully documented and testable here."
    },
    servers: [
      {
        url: "https://your-api-base-url.com",
        description: "Production Server"
      },
      {
        url: "http://localhost:5000",
        description: "Local Development Server"
      }
    ],
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token to authorize protected API endpoints."
        }
      },
      schemas: {
        Player: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            rank: { type: "integer" },
            overall: { type: "integer" },
            age: { type: "integer" },
            team: { type: "string" },
            league: { type: "string" },
            nation: { type: "string" },
            position: { type: "string" },
            preferredFoot: { type: "string", enum: ["Left", "Right"] },
            pace: { type: "integer" },
            shooting: { type: "integer" },
            passing: { type: "integer" },
            dribbling: { type: "integer" },
            defending: { type: "integer" },
            physical: { type: "integer" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            error: { type: "object" }
          }
        }
      }
    }
  };

  routes.forEach((route) => {
    const oApiPath = getOpenApiPath(route.path);
    if (!spec.paths[oApiPath]) {
      spec.paths[oApiPath] = {};
    }

    const methodLower = route.method.toLowerCase();
    
    // Build parameters
    const parameters = [];
    if (route.params) {
      route.params.forEach((param) => {
        parameters.push({
          name: param.name,
          in: "path",
          required: true,
          schema: { type: param.type === "integer" ? "integer" : "string" },
          description: param.description
        });
      });
    }

    if (route.queryParams) {
      route.queryParams.forEach((qParam) => {
        parameters.push({
          name: qParam.name,
          in: "query",
          required: qParam.required || false,
          schema: { 
            type: qParam.type === "integer" ? "integer" : "string",
            default: qParam.default
          },
          description: qParam.description
        });
      });
    }

    if (route.headers) {
      route.headers.forEach((hdr) => {
        if (hdr.name.toLowerCase() !== "authorization") {
          parameters.push({
            name: hdr.name,
            in: "header",
            required: hdr.required || false,
            schema: { type: "string" },
            description: hdr.description
          });
        }
      });
    }

    const operation = {
      summary: route.name,
      description: route.description,
      tags: [route.group],
      parameters,
      responses: {
        [route.method === "POST" && route.path.includes("create") ? "201" : "200"]: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                type: "object"
              },
              example: route.response
            }
          }
        }
      }
    };

    if (route.auth) {
      operation.security = [{ bearerAuth: [] }];
    }

    if (route.requestBody) {
      operation.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object"
            },
            example: route.requestBody
          }
        }
      };
    }

    // Add error responses
    const errorCodes = [400, 401, 403, 404, 429, 500];
    errorCodes.forEach((code) => {
      let desc = "Error Response";
      if (code === 400) desc = "Bad Request - Validation / Payload Failure";
      if (code === 401) desc = "Unauthorized - Missing or Invalid JWT Token";
      if (code === 403) desc = "Forbidden - Insufficient Role Permissions";
      if (code === 404) desc = "Not Found - Resource Does Not Exist";
      if (code === 429) desc = "Too Many Requests - Rate Limiter Triggered";
      if (code === 500) desc = "Internal Server Error - Global Handler Catch";

      operation.responses[code.toString()] = {
        description: desc,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            },
            example: {
              success: false,
              message: desc
            }
          }
        }
      };
    });

    spec.paths[oApiPath][methodLower] = operation;
  });

  return spec;
}

// ----------------------------------------------------
// Generate Postman Collection JSON
// ----------------------------------------------------
function buildPostmanCollection() {
  const collection = {
    info: {
      name: "EAFC 26 Player Analytics API",
      description: "Generated Postman Collection covering all 88 endpoints. Organized logically by folders representing controllers and routing middleware blocks.",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: []
  };

  // Group by categories
  const groupsMap = {};
  routes.forEach((route) => {
    if (!groupsMap[route.group]) {
      groupsMap[route.group] = [];
    }
    groupsMap[route.group].push(route);
  });

  Object.keys(groupsMap).forEach((groupName) => {
    const folder = {
      name: groupName,
      item: []
    };

    groupsMap[groupName].forEach((route) => {
      // Build Headers
      const headers = [];
      if (route.headers) {
        route.headers.forEach((hdr) => {
          headers.push({
            key: hdr.name,
            value: hdr.value,
            description: hdr.description,
            type: "text"
          });
        });
      }
      if (route.auth && !headers.some((h) => h.key.toLowerCase() === "authorization")) {
        headers.push({
          key: "Authorization",
          value: "Bearer {{token}}",
          description: "JWT Bearer Token",
          type: "text"
        });
      }

      // Build url path and query params
      const pmPath = route.path.replace(/^\//, "").split("/");
      // Replace :id with :id for postman variables
      const cleanPmPath = pmPath.map(p => p.startsWith(":") ? p : p);

      const query = [];
      if (route.queryParams) {
        route.queryParams.forEach((q) => {
          query.push({
            key: q.name,
            value: q.default !== undefined ? q.default.toString() : "",
            description: q.description
          });
        });
      }

      const pmRequest = {
        name: route.name,
        request: {
          method: route.method,
          header: headers,
          url: {
            raw: `{{baseUrl}}${route.path}`,
            host: ["{{baseUrl}}"],
            path: cleanPmPath,
            query
          },
          description: route.description
        }
      };

      if (route.requestBody) {
        pmRequest.request.body = {
          mode: "raw",
          raw: JSON.stringify(route.requestBody, null, 2),
          options: {
            raw: {
              language: "json"
            }
          }
        };
      }

      folder.item.push(pmRequest);
    });

    collection.item.push(folder);
  });

  return collection;
}

// ----------------------------------------------------
// Write Specs to File
// ----------------------------------------------------
const openapiSpec = buildOpenApiSpec();
const postmanCollection = buildPostmanCollection();

fs.writeFileSync(
  path.join(outputDir, "openapi.json"),
  JSON.stringify(openapiSpec, null, 2)
);
console.log("Successfully wrote openapi.json");

fs.writeFileSync(
  path.join(outputDir, "postman_collection.json"),
  JSON.stringify(postmanCollection, null, 2)
);
console.log("Successfully wrote postman_collection.json");

// Output Javascript file for client-side inclusion
const routesJsContent = `// Auto-generated routes catalog file for EAFC 26 Player Analytics Documentation
const ROUTES_CATALOG = ${JSON.stringify(routes, null, 2)};
if (typeof module !== 'undefined') {
  module.exports = ROUTES_CATALOG;
}
`;
fs.writeFileSync(
  path.join(outputDir, "routes_data.js"),
  routesJsContent
);
console.log("Successfully wrote routes_data.js");
