import boom from "@hapi/boom";
import policeOfficerService from "./policeOfficer.service";
import logger from "../../../config/winston";
import { transformObjectKeysFromCamelToUnderscore } from "../../../utils/transformer";

const createPoliceOfficer = async (req, res, next) => {
  const police = transformObjectKeysFromCamelToUnderscore(req.body);
  let createdPolice;

  try {
    createdPolice = await policeOfficerService.create(police);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  if (createdPolice === null) {
    return next(boom.badImplementation());
  }

  if (createdPolice?.error) {
    return next(boom.badData(createdPolice.message));
  }

  return res.status(201).json(policeOfficerService.toPublic(createdPolice));
};

const listPoliceOfficers = async (req, res, next) => {
  let policesOfficers;
  try {
    policesOfficers = await policeOfficerService.list();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.json(policesOfficers);
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
