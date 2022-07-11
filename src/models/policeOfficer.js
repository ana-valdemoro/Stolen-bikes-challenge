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
      ref: "Departments",
    },
    user_id: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

PoliceOfficerSchema.methods.toFormatPoliceOfficer = function () {
  const policeOfficer = this.toJSON();
  const user = policeOfficer.user_id;
  const department = policeOfficer.department_id;

  if (user?.email) {
    delete policeOfficer.user_id;
    policeOfficer.user = user;
  }

  if (department?.name) {
    delete policeOfficer.department_id;
    policeOfficer.department = department;
  }

  return policeOfficer;
};
