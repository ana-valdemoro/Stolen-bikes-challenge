import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";

const createStolenBike = async (req, res, next) => {
  let bike = transformObjectKeysFromCamelToUnderscore(req.body);

  try {
    bike = await stolenBikeService.create(bike);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(stolenBikeService.toPublic(bike));
};

export { createStolenBike };
