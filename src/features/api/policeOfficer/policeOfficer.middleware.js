import boom from "@hapi/boom";
import logger from "../../../config/winston";
import departmentService from "../deparment/department.service";
import policeOfficerService from "./policeOfficer.service";

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

export const loadPoliceOfficer = async (req, res, next) => {
  const { policeOfficerId } = req.params;

  let policeOfficer;
  try {
    policeOfficer = await policeOfficerService.getById(policeOfficerId);
  } catch (error) {
    return next(boom.badRequest(error));
  }

  if (!policeOfficer) {
    return next(boom.notFound("Police officer to remove not found"));
  }

  if (policeOfficer.status === "BUSY") {
    return next(
      boom.badData(
        "You cannot delete a police officer assigned to a stolen bike case."
      )
    );
  }

  res.locals.policeOfficer = policeOfficer;
  next();
};
