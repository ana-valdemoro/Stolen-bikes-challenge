import boom from "@hapi/boom";
import userService from "../users/users.service";
import departmentService from "../deparment/department.service";
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

export { createPoliceOfficer };
