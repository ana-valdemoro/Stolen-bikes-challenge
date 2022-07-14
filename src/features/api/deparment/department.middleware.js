import boom from "@hapi/boom";
import logger from "../../../config/winston";
import { getDirectorUser } from "../users/users.service";

export const loadDirectorDepartment = async (req, res, next) => {
  const { directorDepartmentId } = req.body;

  let directorDepartment;
  try {
    directorDepartment = await getDirectorUser(directorDepartmentId);
  } catch (error) {
    logger.error(error);
    return next(boom.badData(error.message));
  }

  res.locals.directorDepartment = {
    full_name: directorDepartment.full_name,
    _id: directorDepartment._id,
  };
  next();
};
