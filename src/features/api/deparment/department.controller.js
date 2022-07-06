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

const listDepartments = async (req, res, next) => {
  let departments;

  try {
    departments = await departmentService.list();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.json(departments);
};

export { createDeparment, listDepartments };
