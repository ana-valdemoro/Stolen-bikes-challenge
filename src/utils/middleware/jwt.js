import { sign, verify } from "jsonwebtoken";
import passport from "passport";
import config from "../../config/index";

const { privateKey, publicKey, expiresIn } = config.jwt;

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
    req.user = user;
    req.userType = info;
    return next();
  })(req, res);
};
