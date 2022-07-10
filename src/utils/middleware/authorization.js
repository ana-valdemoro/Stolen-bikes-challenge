import boom from "@hapi/boom";
import logger from "../../config/winston";
import { getRoleByName } from "../../features/api/role/role.service";

export const hasPoliceOfficerPermissions = (req, res, next) => {
  const { user } = req;
  const policeRole = getRoleByName("Police Officer");
  const directorRole = getRoleByName("Police Director Department");

  logger.info("llega al police middleware");

  if (user.role_id === policeRole._id || user.role_id === directorRole._id) {
    next();
  }

  logger.error(
    `User "${user.full_name}" has no authorization to "${req.baseUrl}${req.url}"`
  );
  return next(
    boom.forbidden(
      `User "${user.full_name}" has no authorization to "${req.baseUrl}${req.url}"`
    )
  );
};

export const hasDirectorPermissions = (req, res, next) => {
  const { user } = req;

  const directorRole = getRoleByName("Police Director Department");

  if (user.role_id === directorRole._id) {
    next();
  }

  logger.error(
    `User "${user.full_name}" has no authorization to "${req.baseUrl}${req.url}"`
  );
  return next(
    boom.forbidden(
      `User "${user.full_name}" has no authorization to "${req.baseUrl}${req.url}"`
    )
  );
};
