import boom from "@hapi/boom";
import logger from "../../../config/winston";
import policeOfficerService from "../policeOfficer/policeOfficer.service";

export const loadPoliceOfficer = async (req, res, next) => {
  const { user } = req;
  let policeOfficer;
  try {
    policeOfficer = await policeOfficerService.getPoliceByUserId(user._id);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error.message));
  }

  if (!policeOfficer) {
    return next(boom.badData("Police Officer doesn't exist"));
  }

  res.locals.policeOfficer = policeOfficer;

  next();
};
