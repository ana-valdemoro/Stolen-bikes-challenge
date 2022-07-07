import { v4 as uuidv4 } from "uuid";
import { StolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const create = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return await StolenBike.create(dataToCreate);
};

const remove = async (stolenBike) => stolenBike.remove();

const getByID = async (id) => StolenBike.findById(id);

const getOneUnsignedBike = async () => {
  return StolenBike.findOne({ status: "UNASSIGNED" });
};

const update = async (id, data) =>
  StolenBike.findByIdAndUpdate(id, data, { new: true });

const list = async (filters) => StolenBike.find({ ...filters });

export default {
  toPublic,
  create,
  remove,
  getByID,
  getOneUnsignedBike,
  update,
  list,
};
