import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";
import solvedStolenBikeService from "../solvedStolenBike/solvedStolenBike.service";

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

const resolveStolenBike = async (req, res, next) => {
  // Se comprueba el policia

  // Se elimina el caso de la colección

  const { stolenBike } = res.locals;

  try {
    await stolenBikeService.remove(stolenBike);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  // Se añade a la colección de casos resuletos --> deben tener el mismo mongoose objectID
  let {
    _doc: { status, ...solvedStolenBike },
  } = stolenBike;
  console.log(solvedStolenBike);

  let solvedCreatedBike;
  try {
    solvedCreatedBike = await solvedStolenBikeService.create(solvedStolenBike);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  //Se responde con el nuevo stolenBike case con status: solved

  return res
    .status(200)
    .json(solvedStolenBikeService.toPublic(solvedCreatedBike));
};

export { createStolenBike, resolveStolenBike };
