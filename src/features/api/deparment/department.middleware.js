import boom from "@hapi/boom";
import logger from "../../../config/winston";
import { getUser } from "../users/users.service";

export const loadDirectorDepartment = async (req, res, next) => {
  const { directorDepartmentId } = req.body;

  let directorDepartment;
  try {
    directorDepartment = await getUser(directorDepartmentId);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error));
  }

  if (!directorDepartment) {
    return next(boom.notFound("Director department not found"));
  }
  res.locals.directorDepartment = {
    full_name: directorDepartment.full_name,
    _id: directorDepartment._id,
  };
  next();
};
