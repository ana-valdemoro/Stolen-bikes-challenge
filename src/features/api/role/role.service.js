import { Role } from "../../../models/index";

export const DIRECTOR = "Police Director Department";
export const POLICE_OFFICER = "Police Officer";
export const BIKE_OWNER = "Bike Owner";

export const getRoleByName = async (roleName) =>
  Role.findOne({ name: roleName });

export const getRoleById = async (id) => Role.findById(id);
