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
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      unique: true,
    },
    director_department: {
      required: true,
      type: directorDepartmentSchema,
      default: {
        full_name: "Steve Doe",
        uuid: "123456789",
      },
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
