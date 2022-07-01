import mongoose from "mongoose";
import StolenBikeSchema from "./stolenBike";
import RoleSchema from "./role";

export const models = {
  StolenBike: mongoose.model("StolenBikes", StolenBikeSchema),
  Role: mongoose.model("Roles", RoleSchema),
};
