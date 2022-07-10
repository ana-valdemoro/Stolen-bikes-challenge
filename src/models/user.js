import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/middleware/jwt";

export const UserSchema = new mongoose.Schema(
  {
    full_name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    role_id: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Roles",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // delete ret._id;
      },
    },
  }
);

/**
 * Before saving an user for the first time, we hash his password
 */
UserSchema.pre("save", function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  return next();
});

UserSchema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

UserSchema.methods.toAuthJSON = function () {
  const user = this.toJSON();
  user.token = generateJWT({
    id: user._id,
    type: "user",
  });
  delete user.password;
  return user;
};

UserSchema.methods.toFormatRole = function () {
  const user = this.toJSON();
  const role = user.role_id;
  delete user.role_id;
  user.role = role;

  return user;
};
