import { v4 as uuidv4 } from "uuid";
import { Role } from "../../../models/index";

export const getRoleByName = async (roleName) =>
  Role.findOne({ name: roleName });
