import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { env } from "./env.js";
import { UserRepository } from "../repositories/user.repository.js";

const cookieExtractor = (req) => {
  if (req?.cookies?.[env.cookieName]) {
    return req.cookies[env.cookieName];
  }
  return null;
};

const bearerOrCookie = (req) => {
  const fromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  return fromHeader || cookieExtractor(req);
};

export const initPassport = () => {
  const userRepository = new UserRepository();

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: bearerOrCookie,
        secretOrKey: env.jwtSecret,
      },
      async (payload, done) => {
        try {
          const user = await userRepository.getById(payload.id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
};
