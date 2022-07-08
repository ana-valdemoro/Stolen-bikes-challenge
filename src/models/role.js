import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    permissions: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
