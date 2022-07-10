import boom from "@hapi/boom";
import logger from "../../config/winston";
import { getRoleByName } from "../../features/api/role/role.service";

export const hasPoliceOfficerPermissions = (req, res, next) => {
  const { user } = req;

  if (
    user.role.name === "Police Officer" ||
    user.role.name === "Police Director Department"
  ) {
    return next();
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

  if (user.role.name === "Police Director Department") {
    return next();
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
