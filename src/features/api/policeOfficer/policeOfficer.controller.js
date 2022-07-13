import boom from "@hapi/boom";
import policeOfficerService from "./policeOfficer.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";
import getPaginationParams from "../../../utils/pagination";

const createPoliceOfficer = async (req, res, next) => {
  const police = transformObjectKeysFromCamelToUnderscore(req.body);
  let createdPolice;

  try {
    createdPolice = await policeOfficerService.create(police);
  } catch (error) {
    logger.error(error);
    return next(boom.badData(error.message));
  }

  if (!createdPolice) {
    return next(boom.badImplementation("Could not create Police officer"));
  }

  return res.status(201).json(policeOfficerService.toPublic(createdPolice));
};

const listPoliceOfficers = async (req, res, next) => {
  const options = getPaginationParams(req.query);

  let policesOfficers, totalPoliceOfficers;
  try {
    policesOfficers = await policeOfficerService.list(options);
    totalPoliceOfficers = await policeOfficerService.countDocuments();
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error.message));
  }

  const response = {
    data: policesOfficers,
    page_number: options.page || 1,
    total_pages: options.limit
      ? Math.ceil(totalPoliceOfficers / options.limit)
      : 1,
    page_size: options.limit || -1,
    page_count: policesOfficers.length || 0,
  };

  return res.json(response);
};

const getPoliceOfficer = async (req, res, next) => {
  const { policeOfficerId } = req.params;
  let policeOfficer;
  try {
    policeOfficer = await policeOfficerService.getByIdWithDepartmentAndUser(
      policeOfficerId
    );
  } catch (error) {
    return next(boom.badRequest(error));
  }

  return res.json(policeOfficer.toFormatPoliceOfficer());
};

const deletePoliceOfficer = async (req, res, next) => {
  const { policeOfficer } = res.locals;
  let removedPoliceOfficer;
  try {
    removedPoliceOfficer = await policeOfficerService.remove(policeOfficer);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error.message));
  }

  if (removedPoliceOfficer === null) {
    return next(
      boom.notFound("It couldn't found the police officer to delete")
    );
  }

  return res.status(200).json({});
};

export {
  createPoliceOfficer,
  listPoliceOfficers,
  getPoliceOfficer,
  deletePoliceOfficer,
};
