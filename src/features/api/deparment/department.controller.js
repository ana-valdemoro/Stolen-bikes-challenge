import boom from "@hapi/boom";
import departmentService from "./department.service";
import logger from "../../../config/winston";

const createDeparment = async (req, res, next) => {
  const departmentToCreate = req.body;
  let department;
  try {
    department = await departmentService.create(departmentToCreate);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(departmentService.toPublic(department));
};

export { createDeparment };
