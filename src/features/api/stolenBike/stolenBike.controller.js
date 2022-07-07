import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";
import solvedStolenBikeService from "../solvedStolenBike/solvedStolenBike.service";
import extractStolenBikeFilters from "./stolenBike.filters";

const createStolenBike = async (req, res, next) => {
  let bike = transformObjectKeysFromCamelToUnderscore(req.body);
  const { user } = req;

  const bikeOwner = {
    _id: user._id,
    full_name: user.full_name,
    uuid: user.uuid,
  };

  if (res.locals?.policeOfficer) {
    const { policeOfficer } = res.locals;
    console.log(policeOfficer);
    bike.police_id = policeOfficer._id;
    bike.status = "IN PROCESS";
  }

  try {
    bike = await stolenBikeService.create({ ...bike, bike_owner: bikeOwner });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      logger.error(`A stolen_bike with this ${duplicatedField} already exists`);
    }

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

const listStolenBike = async (req, res, next) => {
  const filters = extractStolenBikeFilters(req.query);
  let stolenBikes;
  console.log(filters);
  try {
    stolenBikes = await stolenBikeService.list(filters);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.json(stolenBikes);
};

export { createStolenBike, resolveStolenBike, listStolenBike };
