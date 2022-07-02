import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";

const createStolenBike = async (req, res, next) => {
  let { thiefDescription, licenseNumber, ...bike } = req.body;
  let jsonBike;
  bike.thief_description = thiefDescription;
  bike.license_number = licenseNumber;
  try {
    bike = await stolenBikeService.create(bike);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(stolenBikeService.toPublic(bike));
};

export { createStolenBike };
