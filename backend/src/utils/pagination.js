const { PAGINATION } = require("../config/constants");

/**
 * Parses and returns pagination metadata and parameters
 * @param {string|number} page 
 * @param {string|number} limit 
 * @param {number} totalItems 
 */
const getPaginationMetadata = (page, limit, totalItems) => {
  let parsedPage = parseInt(page, 10);
  let parsedLimit = parseInt(limit, 10);

  if (isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = PAGINATION.DEFAULT_PAGE;
  }
  if (isNaN(parsedLimit) || parsedLimit < 1) {
    parsedLimit = PAGINATION.DEFAULT_LIMIT;
  }
  if (parsedLimit > PAGINATION.MAX_LIMIT) {
    parsedLimit = PAGINATION.MAX_LIMIT;
  }

  const skip = (parsedPage - 1) * parsedLimit;
  const totalPages = Math.ceil(totalItems / parsedLimit) || 1;

  return {
    skip,
    limit: parsedLimit,
    metadata: {
      total: totalItems,
      page: parsedPage,
      limit: parsedLimit,
      pages: totalPages,
    },
  };
};

module.exports = {
  getPaginationMetadata,
};
