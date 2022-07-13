import boom from "@hapi/boom";
import departmentService from "./department.service";
import logger from "../../../config/winston";
import getPaginationParams from "../../../utils/pagination";

const createDeparment = async (req, res, next) => {
  const { name } = req.body;
  const { directorDepartment } = res.locals;
  let department;
  const departmentToCreate = {
    name,
    director_department: directorDepartment,
  };

  try {
    department = await departmentService.create(departmentToCreate);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(departmentService.toPublic(department));
};

const listDepartments = async (req, res, next) => {
  const options = getPaginationParams(req.query);
  let departments, totalDepartments;

  try {
    departments = await departmentService.list(options);
    totalDepartments = await departmentService.countDocuments();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const response = {
    data: departments,
    page_number: options.page || 1,
    total_pages: options.limit
      ? Math.ceil(totalDepartments / options.limit)
      : 1,
    page_size: options.limit || -1,
    page_count: departments.length || 0,
  };

  return res.json(response);
};

export { createDeparment, listDepartments };
