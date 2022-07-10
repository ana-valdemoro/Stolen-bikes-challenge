import { Role } from "../../../models/index";

export const getRoleByName = async (roleName) =>
  Role.findOne({ name: roleName });

export const getRoleById = async (id) => Role.findById(id);
