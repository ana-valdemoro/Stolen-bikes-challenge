import logger from "../config/winston";
import { ValidationError } from "express-validation";

// Handle Joi errors
const handleValidationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    logger.error(`${err}`);

    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: "ValidationError",
      message: err.details,
    });
  }

  return next(err);
};

export { handleValidationError };
