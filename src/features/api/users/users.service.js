// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { User } from "../../../models/index";
import jwt from "../../../utils/middleware/jwt";
import logger from "../../../config/winston";

const toPublic = (user) => user.toJSON();

export const getUserByEmail = async (email) => User.findOne({ email });


export const createUser = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return User.create(dataToCreate);
};
