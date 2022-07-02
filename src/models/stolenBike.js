import mongoose from "mongoose";

export const StolenBikeSchema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
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
    owner_id: {
      required: false,
      type: mongoose.ObjectId,
      default: null,
    },
    police_id: {
      required: false,
      type: mongoose.ObjectId,
      default: null,
    },
    status: {
      required: true,
      type: String,
      enum: ["PENDING", "SOLVED"],
      default: "PENDING",
    },
    deleted: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);
