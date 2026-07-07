const buildRegexSearchQuery = (q) => {
  if (!q || typeof q !== "string") return {};

  const query = q.trim();

  // Semantic query helper overrides
  if (/left\s*foot/i.test(query)) {
    return { preferredFoot: "Left" };
  }
  if (/right\s*foot/i.test(query)) {
    return { preferredFoot: "Right" };
  }
  if (/young/i.test(query)) {
    return { age: { $lte: 23 }, ovr: { $gte: 75 } };
  }
  if (/veteran/i.test(query)) {
    return { age: { $gte: 32 } };
  }

  // Default multi-field text search
  const regex = { $regex: query, $options: "i" };
  return {
    $or: [
      { name: regex },
      { team: regex },
      { league: regex },
      { nation: regex },
      { position: regex },
      { playStyles: regex }
    ]
  };
};

module.exports = buildRegexSearchQuery;
