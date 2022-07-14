import mongoose from "mongoose";

const directorDepartmentSchema = new mongoose.Schema({
  full_name: {
    required: true,
    type: String,
  },
  _id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

export const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    director_department: {
      required: true,
      type: directorDepartmentSchema,
    },
  },
  {
    timestamps: true,
  }
);
