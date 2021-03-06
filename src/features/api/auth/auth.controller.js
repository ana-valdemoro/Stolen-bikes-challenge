import boom from "@hapi/boom";
import logger from "../../../config/winston";
import { getUserByEmail, create } from "../users/users.service";
import { BIKE_OWNER, getRoleByName } from "../role/role.service";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await getUserByEmail(email);
  } catch (error) {
    logger.error(error);
    return next(boom.badImplementation(error.message));
  }

  if (!user || !user.hasValidPassword(password)) {
    return next(boom.unauthorized("Email or Password is not valid"));
  }

  return res.json(user.toAuthJSON());
};

export const register = async (req, res, next) => {
  const { fullName, ...userData } = req.body;
  let user;

  try {
    const { _id: id } = await getRoleByName(BIKE_OWNER);

    user = await create({
      full_name: fullName,
      ...userData,
      role_id: id,
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
