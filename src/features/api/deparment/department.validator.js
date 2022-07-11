import joi from "joi";
import { validate } from "express-validation";

const createDeparment = validate(
  {
    body: joi.object({
      name: joi.string().min(2).required(),
      directorDepartmentId: joi.string().length(24).required(),
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

export default { createDeparment };
