import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";
import solvedStolenBikeService from "../solvedStolenBike/solvedStolenBike.service";
import extractStolenBikeFilters from "./stolenBike.filters";
import getPaginationParams from "../../../utils/pagination";
import policeOfficerService from "../policeOfficer/policeOfficer.service";

const createStolenBike = async (req, res, next) => {
  let bike = transformObjectKeysFromCamelToUnderscore(req.body);
  const { user } = req;
  const { bikeOwner } = res.locals;

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
  const { stolenBike } = res.locals;

  if (!stolenBike) {
    return next(boom.notFound("Stolen Bike to resolve cannot be found"));
  }
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

  try {
    await stolenBikeService.remove(stolenBike);
  } catch (error) {
    logger.error(`${error}`);
  }

  try {
    await policeOfficerService.update(solvedCreatedBike.police_id, {
      status: "FREE",
    });
  } catch (error) {
    logger.error(`${error}`);
  }

  return res
    .status(200)
    .json(solvedStolenBikeService.toPublic(solvedCreatedBike));
};

const listStolenBike = async (req, res, next) => {
  const filters = extractStolenBikeFilters(req.query);
  const options = getPaginationParams(req.query);

  let stolenBikes, totalDocuments;

  try {
    stolenBikes = await stolenBikeService.list(filters, options);
    totalDocuments = await stolenBikeService.countDocuments();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const response = {
    data: stolenBikes,
    page_number: options.page || 1,
    total_pages: options.limit ? Math.ceil(totalDocuments / options.limit) : 1,
    page_size: options.limit || -1,
    page_count: stolenBikes.length || 0,
  };

  return res.json(response);
};

const getStolenBike = async (req, res, next) => {
  const { stolenBikeId } = req.params;
  let stolenBike;
  try {
    stolenBike = await stolenBikeService.getByIdWithPoliceData(stolenBikeId);
  } catch (error) {
    return next(boom.badRequest(error.message));
  }

  let response;
  try {
    response = await stolenBike.toFormatPolice();
  } catch (error) {
    logger.error(error);
    return next(boom.badRequest(error.message));
  }

  return res.json(response);
};

const getAssignedStolenBike = async (req, res, next) => {
  const { policeOfficer } = res.locals;
  let stolenBike;

  try {
    stolenBike = await stolenBikeService.getByPoliceOfficerId(policeOfficer);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error));
  }

  if (!stolenBike) {
    return res.json({
      message: `Police officer ${req.user.full_name} is not currently assigned to any stolen bike cases`,
    });
  }

  return res.json(stolenBike);
};

export {
  createStolenBike,
  resolveStolenBike,
  listStolenBike,
  getStolenBike,
  getAssignedStolenBike,
};
