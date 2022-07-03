import mongoose from "mongoose";
import { StolenBikeSchema } from "./stolenBike";
import { RoleSchema } from "./role";
import { UserSchema } from "./user";

export const Role = mongoose.model("Roles", RoleSchema);
export const StolenBike = mongoose.model("StolenBikes", StolenBikeSchema);
export const User = mongoose.model("Users", UserSchema);
