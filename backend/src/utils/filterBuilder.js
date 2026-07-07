const buildAdvancedFilter = (queryParams) => {
  const filter = {};

  // Numeric range fields
  const rangeFields = [
    { queryKey: "Pace", dbKey: "pace" },
    { queryKey: "Shooting", dbKey: "shooting" },
    { queryKey: "Passing", dbKey: "passing" },
    { queryKey: "Dribbling", dbKey: "dribbling" },
    { queryKey: "Defending", dbKey: "defending" },
    { queryKey: "Physical", dbKey: "physical" },
    { queryKey: "Ovr", dbKey: "ovr" },
    { queryKey: "Age", dbKey: "age" },
    { queryKey: "WeakFoot", dbKey: "weakFoot" },
    { queryKey: "SkillMoves", dbKey: "skillMoves" }
  ];

  for (const field of rangeFields) {
    const minVal = queryParams[`min${field.queryKey}`];
    const maxVal = queryParams[`max${field.queryKey}`];
    const exactVal = queryParams[field.dbKey] || queryParams[field.queryKey.toLowerCase()];

    if (minVal !== undefined || maxVal !== undefined || exactVal !== undefined) {
      filter[field.dbKey] = {};
      if (minVal !== undefined) {
        filter[field.dbKey].$gte = Number(minVal);
      }
      if (maxVal !== undefined) {
        filter[field.dbKey].$lte = Number(maxVal);
      }
      if (exactVal !== undefined) {
        filter[field.dbKey] = Number(exactVal);
      }
    }
  }

  // String fields
  const stringFields = ["team", "league", "nation", "position", "preferredFoot"];
  for (const field of stringFields) {
    if (queryParams[field]) {
      filter[field] = { $regex: new RegExp(`^${queryParams[field]}$`, "i") };
    }
  }

  // Array containment fields
  if (queryParams.alternativePosition) {
    filter.alternativePositions = {
      $in: [new RegExp(`^${queryParams.alternativePosition}$`, "i")]
    };
  }

  if (queryParams.playstyle) {
    filter.playStyles = {
      $in: [new RegExp(`^${queryParams.playstyle}$`, "i")]
    };
  }

  return filter;
};

module.exports = buildAdvancedFilter;
