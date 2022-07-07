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
    // uuid: {
    //   required: true,
    //   type: String,
    //   unique: true,
    // },
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
    police_id: {
      required: false,
      type: mongoose.Types.ObjectId,
      unique: true,
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
