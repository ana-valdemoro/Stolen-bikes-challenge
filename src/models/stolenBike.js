import mongoose from "mongoose";

const bikeOwnerSchema = new mongoose.Schema({
  full_name: {
    required: true,
    type: String,
  },
  uuid: {
    required: true,
    type: String,
  },
});

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
    },
    type: {
      required: true,
      type: String,
    },
    bike_owner: {
      required: true,
      type: bikeOwnerSchema,
    },
    police_id: {
      type: mongoose.Types.ObjectId,
      unique: true,
      sparse: true,
      ref: "policeofficers",
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
    // toJSON: {
    //   transform(doc, ret) {
    //     delete ret._id;
    //   },
    // },
  }
);
