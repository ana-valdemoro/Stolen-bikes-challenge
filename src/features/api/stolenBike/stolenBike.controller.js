import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";
import solvedStolenBikeService from "../solvedStolenBike/solvedStolenBike.service";
import extractStolenBikeFilters from "./stolenBike.filters";
import getPaginationParams from "../../../utils/pagination";
import policeOfficerService from "../policeOfficer/policeOfficer.service";

const createStolenBike = async (req, res, next) => {
  const { bikeOwnerId, ...bikeToFormat } = req.body;
  let bike = transformObjectKeysFromCamelToUnderscore(bikeToFormat);
  const { bikeOwner, policeOfficer } = res.locals;

  if (policeOfficer) {
    bike.police_officer_id = policeOfficer._id;
    bike.status = "IN PROCESS";
  }
  let stolenBike;
  try {
    stolenBike = await stolenBikeService.create({
      ...bike,
      bike_owner: bikeOwner,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return next(
        boom.badData(
          `A stolen bike with this ${duplicatedField} already exists`
        )
      );
    }

    logger.error(error);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(stolenBikeService.toPublic(stolenBike));
};

const resolveStolenBike = async (req, res, next) => {
  const { stolenBike } = res.locals;

  if (stolenBike.status !== "IN PROCESS") {
    return next(
      boom.unauthorized(
        "It is not possible to solve a stolen bike that has not IN PROCESS status"
      )
    );
  }
  let {
    _doc: { status, ...solvedStolenBike },
  } = stolenBike;

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
    await policeOfficerService.update(solvedCreatedBike.police_officer_id, {
      status: "FREE",
    });
  } catch (error) {
    logger.error(error);
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
    totalDocuments = await stolenBikeService.countDocuments(filters);
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
    return next(boom.badImplementation(error.message));
  }

  if (!stolenBike) {
    return next(boom.notFound("Cannot found a stolen bike with that id"));
  }
  let response = stolenBike.toFormatPolice();

  return res.json(response);
};

const getAssignedStolenBike = async (req, res, next) => {
  const { stolenBike } = res.locals;

  if (!stolenBike) {
    return res.status(204).json({});
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
