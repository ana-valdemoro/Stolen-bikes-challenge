import boom from "@hapi/boom";
import logger from "../../../config/winston";
import policeOfficerService from "../policeOfficer/policeOfficer.service";
import stolenBikeService from "../stolenBike/stolenBike.service";

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

export const loadPoliceOfficerStolenBike = async (req, res, next) => {
  const { policeOfficer } = res.locals;
  let stolenBike;

  try {
    stolenBike = await stolenBikeService.getByPoliceOfficerId(policeOfficer);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error));
  }
  if (!stolenBike) {
    return next(boom.notFound("Stolen Bike to resolve cannot be found"));
  }

  res.locals.stolenBike = stolenBike;

  next();
};
