import { PoliceOfficer, User } from "../../../models/index";
import { createPoliceOfficerUser } from "../users/users.service";
import logger from "../../../config/winston";

const toPublic = (department) => department.toJSON();

const create = async (data) => {
  const { department_id, ...user } = data;
  let userCreated;

  try {
    userCreated = await createPoliceOfficerUser(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return Promise.reject({
        message: `A user with this ${duplicatedField} and value ${user[duplicatedField]} already exists`,
      });
    }
    logger.error(error);
    return Promise.reject(error);
  }
  if (!userCreated) {
    return Promise.reject({
      message: "User could not be created",
    });
  }

  const dataToCreate = {
    department_id,
    user_id: userCreated._id,
  };

  return await PoliceOfficer.create(dataToCreate);
};

const list = async () => PoliceOfficer.find({});

const update = async (id, data) =>
  PoliceOfficer.findByIdAndUpdate(id, data, { new: true });

const bookFreePoliceOfficer = async () => {
  return PoliceOfficer.findOneAndUpdate(
    { status: "FREE" },
    { status: "BUSY" },
    { new: true }
  );
};

const getPoliceByUserId = async (id) => {
  return PoliceOfficer.findOne({ user_id: id });
};

const getByIdWithDepartmentAndUser = async (id) =>
  PoliceOfficer.findById(id)
    .populate({
      path: "user_id",
      select: "_id full_name email",
    })
    .populate({ path: "department_id", select: "_id name" });

const remove = async (policeOfficer) => {
  let removedPoliceOfficer;
  try {
    removedPoliceOfficer = await policeOfficer.remove();
  } catch (error) {
    return Promise.reject(error);
  }

  return removedPoliceOfficer;
};

const getById = async (id) => PoliceOfficer.findById(id);
export default {
  create,
  toPublic,
  list,
  update,
  bookFreePoliceOfficer,
  getPoliceByUserId,
  getByIdWithDepartmentAndUser,
  remove,
  getById,
};
