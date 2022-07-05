import mongoose from "mongoose";

export const PoliceOfficerSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["BUSY", "FREE"],
      default: "FREE",
    },
    department_id: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    user_id: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
