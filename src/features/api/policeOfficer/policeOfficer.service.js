import { v4 as uuidv4 } from "uuid";
import { PoliceOfficer } from "../../../models/index";
import { createPoliceOfficerUser } from "../users/users.service";
import departmentService from "../deparment/department.service";

import logger from "../../../config/winston";

const toPublic = (department) => department.toJSON();

const create = async (data) => {
  const { department_id, ...user } = data;
  let userCreated, deparment;
  //Check if department exist
  try {
    deparment = await departmentService.getByID(department_id);
    if (!deparment) {
      return { error: "422", message: "Department ID does not exist" };
    }
  } catch (error) {
    logger.error(error);
    return error;
  }

  // Calle to createPoliceOfficerUser
  try {
    userCreated = await createPoliceOfficerUser(user);
    // console.log(userCreated);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return {
        error: "MongoError",
        message: `A user with this ${duplicatedField} already exists`,
      };
    }
    logger.error(error);
    return error;
  }
  if (!userCreated) {
    return { error: "MongoError", message: "User cannot be created" };
  }

  const dataToCreate = {
    department_id: deparment._id,
    user_id: userCreated._id,
  };

  return await PoliceOfficer.create(dataToCreate);
};

const list = async () => PoliceOfficer.find({});

export default { create, toPublic, list };
