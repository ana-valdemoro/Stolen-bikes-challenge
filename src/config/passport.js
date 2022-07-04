const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
import passport from "passport";
import { getUser } from "../features/api/users/users.service";
import config from ".";

const { publicKey } = config.jwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: publicKey,
};

export const defineJWTStrategy = () => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      console.log(jwtPayload);
      const expirationDate = new Date(jwtPayload.exp * 1000);

      if (expirationDate < new Date()) {
        return done(null, false);
      }

      if (jwtPayload.type === "user") {
        try {
          const user = await getUser(jwtPayload.uuid);

          return done(user, null, jwtPayload.type);
        } catch (e) {
          return done(
            null,
            { status: false, message: "El usuario no existe." },
            jwtPayload.type
          );
        }
      }

      return done(null, false);
    })
  );
};
