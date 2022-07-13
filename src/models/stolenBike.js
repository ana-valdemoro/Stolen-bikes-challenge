import { bikeOwnerSchema } from "./bikeOwner";
import mongoose from "mongoose";

export const StolenBikeSchema = new mongoose.Schema(
  {
    color: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
    thief_description: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    license_number: {
      required: true,
      type: String,
      unique: true,
    },
    type: {
      required: true,
      type: String,
    },
    bike_owner: {
      required: true,
      type: bikeOwnerSchema,
    },
    police_officer_id: {
      ref: "policeofficer",
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      sparse: true,
    },
    status: {
      required: true,
      type: String,
      enum: ["UNASSIGNED", "IN PROCESS"],
      default: "UNASSIGNED",
    },
  },
  {
    timestamps: true,
  }
);

StolenBikeSchema.methods.toFormatPolice = function () {
  const stolenBike = this.toJSON();
  const police = stolenBike.police_officer_id;
  delete stolenBike.police_officer_id;
  stolenBike.police_officer = police;

  return stolenBike;
};
