import config from "../config/index";

const getParams = (params) => {
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

export default getParams;
