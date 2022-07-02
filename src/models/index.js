import mongoose from "mongoose";
import { StolenBikeSchema } from "./stolenBike";

export const StolenBike = mongoose.model("StolenBikes", StolenBikeSchema);
