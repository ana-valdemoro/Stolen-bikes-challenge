import boom from "@hapi/boom";
import logger from "../../../config/winston";
import { getUserByEmail } from "../users/users.service";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await getUserByEmail(email);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  if (!user) {
    return next(boom.unauthorized("User not found"));
  }

  try {
    const userHasValidPassword = await user.validPassword(password);

    if (!userHasValidPassword) {
      return next(boom.unauthorized("Password is not valid"));
    }
  } catch (error) {
    console.log("hola");
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  let response;

  try {
    response = await user.toAuthJSON();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  return res.json(response);
};
