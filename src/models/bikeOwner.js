import mongoose from "mongoose";

export const bikeOwnerSchema = new mongoose.Schema({
  full_name: {
    required: true,
    type: String,
  },
  _id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});
