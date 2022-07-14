import mongoose from "mongoose";
import { bikeOwnerSchema } from "./bikeOwner";

export const SolvedStolenBikeSchema = new mongoose.Schema(
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
    },
    type: {
      required: true,
      type: String,
    },
    bike_owner: {
      required: false,
      type: bikeOwnerSchema,
    },
    police_officer_id: {
      required: false,
      type: mongoose.Types.ObjectId,
      default: null,
    },
    status: {
      required: true,
      type: String,
      enum: ["SOLVED"],
      default: "SOLVED",
    },
  },
  {
    timestamps: true,
  }
);
