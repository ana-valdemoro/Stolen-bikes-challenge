// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { User } from "../../../models/index";
import jwt from "../../../utils/middleware/jwt";
import logger from "../../../config/winston";
import { getRoleByName } from "../role/role.service";

const toPublic = (user) => user.toJSON();

export const getUserByEmail = async (email) => User.findOne({ email });

export const getUser = async (uuid) => User.findOne({ uuid });

export const create = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return User.create(dataToCreate);
};

export const createPoliceOfficerUser = async (data) => {
  // Get polic officer role
  const { uuid } = await getRoleByName("Police Officer");
  if (uuid === undefined || uuid === null) {
    return null;
  }
  // call to createUser
  return await create({ ...data, role_uuid: [uuid], password: "12345" });
};
