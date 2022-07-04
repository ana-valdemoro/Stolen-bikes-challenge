import mongoose from "mongoose";
import { StolenBikeSchema } from "./stolenBike";
import { DepartmentSchema } from "./department";
import { RoleSchema } from "./role";
import { UserSchema } from "./user";

export const StolenBike = mongoose.model("StolenBikes", StolenBikeSchema);
export const Department = mongoose.model("Departments", DepartmentSchema);
export const Role = mongoose.model("Roles", RoleSchema);
export const User = mongoose.model("Users", UserSchema);
