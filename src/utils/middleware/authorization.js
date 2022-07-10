import boom from "@hapi/boom";
import logger from "../../config/winston";
import { hasPermission } from "../../features/api/users/users.service";

export const checkUserIsAuthorized = (resource) => async (req, res, next) => {
  const { user } = req;
  console.log("soy el user del checkUserAuthorized");
  console.log(user);

  try {
    const userHasPermission = await hasPermission(user, resource);

    if (userHasPermission) {
      logger.info(
        `User "${user.full_name}" has authorization to "${req.baseUrl}${req.url}"`
      );
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
  } catch (error) {
    logger.error(`${error}`);
    return next(
      boom.forbidden(
        `User "${user.full_name}" has no authorization to "${req.baseUrl}${req.url}"`
      )
    );
  }
};
