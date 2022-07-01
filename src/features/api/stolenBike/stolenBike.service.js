import { v4 as uuidv4 } from "uuid";

import { StolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const createStolenBike = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return StolenBike.create(dataToCreate);
};

export { toPublic, createStolenBike };
