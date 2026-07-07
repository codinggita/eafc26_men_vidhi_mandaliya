const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

const SORT = {
  ALLOWED_FIELDS: [
    "ovr",
    "pace",
    "shooting",
    "passing",
    "dribbling",
    "defending",
    "physical",
    "age",
    "rank",
    "name",
  ],
  DEFAULT_FIELD: "rank",
  DEFAULT_ORDER: 1,
};

module.exports = {
  PAGINATION,
  SORT,
};
