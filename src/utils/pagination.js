import config from "../config/index";

/**
 *
 * @param {object} params contains all the params inside the query string route
 * @returns {object} with the following format:
 *  - limit: null | limit,  number of items to find
 *  - page:  null |  number,  means the current page
 */

const getPaginationParams = (params) => {
  const { page, pageSize } = params;
  let limit = parseInt(pageSize, 10) || config.pagination.pageSize;
  if (limit > config.pagination.maxPageSize) {
    limit = config.pagination.maxPageSize;
  }

  // If user wants to retrieve all data
  if (limit === -1) {
    return { limit: null, page: null };
  }

  return {
    limit,
    page: parseInt(page, 10) || 1,
  };
};

export default getPaginationParams;
