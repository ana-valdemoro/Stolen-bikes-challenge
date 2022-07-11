const extractFilters = (params) => {
  const query = {};

  if (params?.status === "UNASSIGNED" || params?.status === "IN PROCESS") {
    query.status = params.status;
  }

  if (params.date) {
    query.date = params.date;
  }

  if (params.licenseNumber) {
    query.license_number = { $regex: params.licenseNumber };
  }

  if (params.bikeOwnerId) {
    query["bike_owner._id"] = params.bikeOwnerId;
  }

  return query;
};

export default extractFilters;
