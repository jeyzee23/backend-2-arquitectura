import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { env } from "./env.js";
import { UserModel } from "../models/user.model.js";

const cookieExtractor = (req) => req?.cookies?.[env.cookieName] || null;

const bearerOrCookie = (req) => {
  const fromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  return fromHeader || cookieExtractor(req);
};

export const initPassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: bearerOrCookie,
        secretOrKey: env.jwtSecret,
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findById(payload.id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
};
