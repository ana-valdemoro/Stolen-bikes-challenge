import { Department } from "../../../models/index";

const toPublic = (department) => department.toJSON();

const create = async (data) => await Department.create(data);

const getByID = async (id) => Department.findById(id);

const list = async () => Department.find({});

export default { toPublic, create, getByID, list };
