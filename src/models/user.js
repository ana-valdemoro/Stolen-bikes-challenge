import mongoose from "mongoose";
import bcrypt from "bcrypt";

const jwt = require("../utils/middleware/jwt");

const schema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
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
    token: {
      type: String,
      default: "",
    },
    role_uuid: {
      required: true,
      type: [String],
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
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

/**
 * Before saving an user for the first time, we hash his password
 */
schema.pre("save", function (next) {
  const user = this;
  console.log(this);
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  return next();
});

schema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};
schema.methods.toAuthJSON = function () {
  const user = this.toJSON();
  user.token = jwt.generateJWT({
    uuid: user.uuid,
    type: "user",
  });
  delete user.password;
  return user;
};

export default schema;
