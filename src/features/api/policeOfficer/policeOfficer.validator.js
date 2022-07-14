import joi from "joi";
import { validate } from "express-validation";

const createPoliceOfficer = validate(
  {
    body: joi.object({
      fullName: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      departmentId: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
  {
    abortEarly: false,
  }
);

const getById = validate(
  {
    params: joi.object({
      policeOfficerId: joi.string().length(24).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
  {
    abortEarly: false,
  }
);

export default { createPoliceOfficer, getById };
