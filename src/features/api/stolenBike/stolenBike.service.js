import { v4 as uuidv4 } from "uuid";
import { StolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const create = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  console.log(dataToCreate);
  return await StolenBike.create(dataToCreate);
};

export default { toPublic, create };
