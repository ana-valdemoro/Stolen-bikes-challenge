import { sign } from "jsonwebtoken";
import boom from "@hapi/boom";
import passport from "passport";
import config from "../../config/index";

const { privateKey, expiresIn } = config.jwt;

export const generateJWT = (payload) =>
  sign(payload, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });

export const authorizeHeader = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (user, error, info) => {
    if (error) {
      return res.status(401).send(error);
    }
    if (!user) {
      return next(boom.unauthorized(info.message));
    }
    req.user = user.toFormatRole();
    req.userType = info;

    return next();
  })(req, res);
};
