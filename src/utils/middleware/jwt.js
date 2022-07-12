import { sign } from "jsonwebtoken";
import passport from "passport";
import config from "../../config/index";
import logger from "../../config/winston";

const { privateKey, expiresIn } = config.jwt;

export const generateJWT = (payload) =>
  sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

export const authorizeHeader = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (user, error, info) => {
    if (error) {
      return res.status(401).send(error);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.user = user.toFormatRole();
    req.userType = info;
    console.log(req.user);
    return next();
  })(req, res);
};
