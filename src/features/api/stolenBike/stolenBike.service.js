import { StolenBike } from "../../../models/index";

const toPublic = (stolenBike) => stolenBike.toJSON();

const create = async (data) => await StolenBike.create(data);

const remove = async (stolenBike) => stolenBike.remove();

const getByID = async (id) => StolenBike.findById(id);

const getByPoliceOfficerId = async (police_id) =>
  StolenBike.findOne({ police_id });

const getByIdWithPoliceData = async (id) =>
  StolenBike.findById(id).populate({
    path: "police_id",
    select: "_id department_id status",
    populate: {
      path: "department_id",
      model: "Departments",
      select: "_id name director_department",
    },
  });

const getOneUnsignedBike = async () => {
  return StolenBike.findOne({ status: "UNASSIGNED" });
};

const update = async (id, data) =>
  StolenBike.findByIdAndUpdate(id, data, { new: true });

const list = async (filters, options) => {
  const { page, limit } = options;
  const offset = page * limit - limit;

  return StolenBike.find({ ...filters })
    .skip(offset)
    .limit(limit);
};

const countDocuments = async () => StolenBike.countDocuments();

export default {
  toPublic,
  create,
  remove,
  getByID,
  getOneUnsignedBike,
  update,
  list,
  countDocuments,
  getByIdWithPoliceData,
  getByPoliceOfficerId,
};
