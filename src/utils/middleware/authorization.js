import boom from "@hapi/boom";
import logger from "../../config/winston";
import { DIRECTOR, POLICE_OFFICER } from "../../features/api/role/role.service";

export const hasPoliceOfficerPermissions = (req, res, next) => {
  const { user } = req;

  if (user.role.name === POLICE_OFFICER) {
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

  if (user.role.name === DIRECTOR) {
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

export const hasPermissions = (req, res, next) => {
  const { user } = req;
  const {
    role: { name },
  } = user;

  if (name === DIRECTOR || name === POLICE_OFFICER) {
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
