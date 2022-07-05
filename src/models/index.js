import mongoose from "mongoose";
import { StolenBikeSchema } from "./stolenBike";
import { DepartmentSchema } from "./department";
import { RoleSchema } from "./role";
import { UserSchema } from "./user";
import { PoliceOfficerSchema } from "./policeOfficer";
import { SolvedStolenBikeSchema } from "./solvedStolenBike";
export const StolenBike = mongoose.model("StolenBikes", StolenBikeSchema);
export const SolvedStolenBike = mongoose.model(
  "SolvedStolenBikes",
  SolvedStolenBikeSchema
);
export const Department = mongoose.model("Departments", DepartmentSchema);
export const Role = mongoose.model("Roles", RoleSchema);
export const User = mongoose.model("Users", UserSchema);
export const PoliceOfficer = mongoose.model(
  "PolicesOfficer",
  PoliceOfficerSchema
);
