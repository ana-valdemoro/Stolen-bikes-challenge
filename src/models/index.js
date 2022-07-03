import mongoose from "mongoose";
import { StolenBikeSchema } from "./stolenBike";
import { DepartmentSchema } from "./department";

export const StolenBike = mongoose.model("StolenBikes", StolenBikeSchema);
export const Department = mongoose.model("Departments", DepartmentSchema);
