import { v4 as uuidv4 } from "uuid";
import { Department } from "../../../models/index";

const toPublic = (department) => department.toJSON();

const create = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };

  return await Department.create(dataToCreate);
};

export default { toPublic, create };
