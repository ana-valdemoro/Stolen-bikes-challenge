import { v4 as uuidv4 } from "uuid";
import { StolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const create = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  console.log(dataToCreate);
  return await StolenBike.create(dataToCreate);
};

const remove = async (stolenBike) => stolenBike.remove();

const getByID = async (id) => StolenBike.findById(id);

export default { toPublic, create, remove, getByID };
