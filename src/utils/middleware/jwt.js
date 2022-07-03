import { sign, verify } from "jsonwebtoken";
import { authenticate } from "passport";
import config from "../../config/index";

const { privateKey, publicKey, expiresIn } = config.jwt;

export const generateJWT = (payload) =>
  sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

