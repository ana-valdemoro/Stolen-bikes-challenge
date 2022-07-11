import boom from "@hapi/boom";
import logger from "../../../config/winston";
import policeOfficerService from "../policeOfficer/policeOfficer.service";
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
    return next(boom.badRequest("Cannot look in stolenBike collection"));
  }

  if (stolenBike) {
    res.locals.stolenBike = stolenBike;
  }

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
  console.log(user);

  if (role.name === "Bike Owner") {
    bikeOwner = {
      _id: user._id,
      full_name: user.full_name,
    };
    res.locals.bikeOwner = bikeOwner;
    next();
  }

  const { bikeOwnerId } = req.body;

  if (!bikeOwnerId) {
    return next(boom.badData("bikeOwnerId is required"));
  }

  try {
    bikeOwner = await getBikeOwnerUser(bikeOwnerId);
  } catch (error) {
    console.log("peta aqui");
    logger.error(error);
    return next(boom.badRequest(error));
  }

  if (!bikeOwner) {
    return next(boom.notFound("Bike owner not found"));
  }

  res.locals.bikeOwner = bikeOwner;

  next();
}

export async function checkOwnerShipOfTheCase(req, res, next) {}
