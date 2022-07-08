import boom from "@hapi/boom";
import logger from "../../../config/winston";
import departmentService from "../deparment/department.service";

export const checkIfDepartmentExist = async (req, res, next) => {
  const { departmentId } = req.body;
  let deparment;

  try {
    deparment = await departmentService.getByID(departmentId);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error.message));
  }

  if (!deparment) {
    return next(boom.badData("Department doesn't exist"));
  }

  next();
};
