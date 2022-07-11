import boom from "@hapi/boom";
import logger from "../../config/winston";

export const hasPoliceOfficerPermissions = (req, res, next) => {
  const { user } = req;

  if (user.role.name === "Police Officer") {
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

export const hasPermissions = (req, res, next) => {
  const { user } = req;
  const {
    role: { name },
  } = user;

  if (name === "Police Director Department" || name === "Police Officer") {
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
