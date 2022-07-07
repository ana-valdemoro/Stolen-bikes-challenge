import boom from "@hapi/boom";
import logger from "../../../config/winston";
import policeOfficerService from "../policeOfficer/policeOfficer.service";
import stolenBikeService from "./stolenBike.service";

export async function loadStolenBike(req, res, next) {
  const { stolenBikeId } = req.params;
  let stolenBike;

  if (!stolenBikeId) {
    return next(boom.badData("StolenBikeId is required"));
  }

  try {
    stolenBike = await stolenBikeService.getByID(stolenBikeId);
  } catch (error) {
    return next(boom.badRequest("Cannot look in stolenBike collection"));
  }

  if (!stolenBike) return next(boom.notFound("StolenBike not found"));
  res.locals.stolenBike = stolenBike;

  next();
}

export async function bookFreePoliceOfficer(req, res, next) {
  let policeOfficer;
  try {
    policeOfficer = await policeOfficerService.bookFreePoliceOfficer();
  } catch (error) {
    logger.error(error);
  }

  if (policeOfficer) {
    res.locals.policeOfficer = policeOfficer;
  }

  next();
}

export async function checkOwnerShipOfTheCase(req, res, next) {}
