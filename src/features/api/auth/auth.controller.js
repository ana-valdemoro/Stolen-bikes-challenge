import boom from "@hapi/boom";
import logger from "../../../config/winston";
import { getUserByEmail, createUser } from "../users/users.service";
import { getRoleByName } from "../role/role.service";

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

export const register = async (req, res, next) => {
  const { fullName, ...userData } = req.body;
  let user;

  try {
    const { uuid } = await getRoleByName("Bike Owner");

    user = await createUser({
      full_name: fullName,
      ...userData,
      role_uuid: [uuid],
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return next(
        boom.badData(`A user with this ${duplicatedField} already exists`)
      );
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.status(201).json(user.toJSON());
};
