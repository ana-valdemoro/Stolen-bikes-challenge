import { Department } from "../../../models/index";

const toPublic = (department) => department.toJSON();

const create = async (data) => await Department.create(data);

const getByID = async (id) => Department.findById(id);

const list = async (options) => {
  const { page, limit } = options;
  const offset = page * limit - limit;

  return Department.find({}).skip(offset).limit(limit);
};

const countDocuments = async () => Department.countDocuments();

export default { toPublic, create, getByID, list, countDocuments };
