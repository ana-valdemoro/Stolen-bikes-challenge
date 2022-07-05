import { SolvedStolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const create = async (data) => {
  return await SolvedStolenBike.create(data);
};

export default { create, toPublic };
