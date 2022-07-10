import joi from "joi";
import { validate } from "express-validation";

const createStolenBike = validate(
  {
    body: joi.object({
      color: joi.string().min(3).max(12).required(),
      date: joi
        .date()
        .iso()
        .less("now")
        .messages({ "date.format": `Date format is YYYY-MM-DD` })
        .required(),
      thiefDescription: joi.string().min(20).max(250).required(),
      address: joi.string().min(12).max(100).required(),
      type: joi.string().min(5).max(50).required(),
      licenseNumber: joi.string().min(5).max(20).required(),
      bikeOwnerId: joi.string().length(24),
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

const resolveStolenBike = validate(
  {
    body: joi.object({}),
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

export default { createStolenBike, resolveStolenBike };
