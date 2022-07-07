const extractFilters = (params) => {
  const query = {};

  if (params?.status === "UNASSIGNED" || params?.status === "IN PROCESS") {
    query.status = params.status;
  }

  if (params.date) {
    query.date = params.date;
  }

  if (params.license_number) {
    query.license_number = params.license_number;
  }

  return query;
};

export default extractFilters;
