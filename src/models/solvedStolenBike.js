import mongoose from "mongoose";

const bikeOwnerSchema = new mongoose.Schema({
  full_name: {
    required: true,
    type: String,
  },
  _id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

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
      default: {
        full_name: "Joana Doe",
        uuid: "123456789",
      },
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
