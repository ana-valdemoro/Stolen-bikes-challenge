// eslint-disable-next-line no-unused-vars
import { User } from "../../../models/index";

import { getRoleByName } from "../role/role.service";

const toPublic = (user) => user.toJSON();

export const getUserByEmail = async (email) => User.findOne({ email });

export const getUser = async (uuid) => User.findOne({ uuid });

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
};
