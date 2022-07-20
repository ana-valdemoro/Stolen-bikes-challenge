import boom from "@hapi/boom";
import logger from "../../../config/winston";
import policeOfficerService from "../policeOfficer/policeOfficer.service";
import { BIKE_OWNER } from "../role/role.service";
import { getBikeOwnerUser } from "../users/users.service";
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
    return next(boom.badImplementation());
  }

  if (!stolenBike) {
    return next(boom.notFound("Stolen Bike to resolve cannot be found"));
  }

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

export async function loadBikeOwner(req, res, next) {
  const { user } = req;
  const { role } = user;
  let bikeOwner;

  if (role.name === BIKE_OWNER) {
    bikeOwner = {
      _id: user._id,
      full_name: user.full_name,
    };
    res.locals.bikeOwner = bikeOwner;
    return next();
  }

  const { bikeOwnerId } = req.body;

  if (!bikeOwnerId) {
    return next(boom.badData("bikeOwnerId is required"));
  }

  try {
    bikeOwner = await getBikeOwnerUser(bikeOwnerId);
  } catch (error) {
    logger.error(error);
    return next(boom.badRequest(error));
  }

  if (!bikeOwner) {
    return next(boom.notFound("Bike owner not found"));
  }

  res.locals.bikeOwner = bikeOwner;

  next();
}
