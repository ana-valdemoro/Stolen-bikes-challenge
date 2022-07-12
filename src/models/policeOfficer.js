import mongoose from "mongoose";
import { User } from ".";

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
      unique: true,
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

PoliceOfficerSchema.pre("remove", async function (next) {
  const policeOfficer = this;

  let deletedUser = await User.findByIdAndDelete(policeOfficer.user_id);

  if (!deletedUser) {
    throw new Error("Police officer user could not be deleted");
  }
  next();
});
