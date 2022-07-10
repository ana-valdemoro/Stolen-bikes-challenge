import { User } from "../../../models/index";

import { getRoleByName, getRoleById } from "../role/role.service";

const toPublic = (user) => user.toJSON();

export const getUserByEmail = async (email) => User.findOne({ email });

export const getUser = async (id) => User.findById(id);

export const getUserWithRole = async (id) =>
  User.findById(id).populate({
    path: "role_id",
    select: "_id name",
  });

export const create = async (data) => User.create(data);

export const createPoliceOfficerUser = async (data) => {
  // Get police officer role
  const { _id: id } = await getRoleByName("Police Officer");
  if (!id) {
    return null;
  }
  // Call to createUser
  return await create({ ...data, role_id: id, password: "12345" });
};

export const getBikeOwnerUser = async (id) => {
  const bikeOwner = await getUserWithRole(id);
  console.log(bikeOwner.role_id.name);
  if (bikeOwner.role_id.name !== "Bike Owner") {
    return null;
  }

  return bikeOwner;
};
