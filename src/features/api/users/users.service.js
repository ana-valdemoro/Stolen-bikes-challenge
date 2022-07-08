import { User } from "../../../models/index";

import { getRoleByName, getRoleById } from "../role/role.service";

const toPublic = (user) => user.toJSON();

export const getUserByEmail = async (email) => User.findOne({ email });

export const getUser = async (id) => User.findById(id);

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

export const hasPermission = async (user, permission) => {
  const { permissions } = await getRoleById(user.role_id);

  const userRights = permissions.split(",");
  const [resource] = permission.split(":");

  return (
    userRights.includes(`${resource}:all`) || userRights.includes(permission)
  );
};
