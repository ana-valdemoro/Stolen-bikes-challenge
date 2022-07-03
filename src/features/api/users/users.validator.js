import joi from "joi";
import { validate } from "express-validation";

const createUser = validate(
  {
    body: joi.object({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
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

const login = validate(
  {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  }
);

export default { createUser, login };
