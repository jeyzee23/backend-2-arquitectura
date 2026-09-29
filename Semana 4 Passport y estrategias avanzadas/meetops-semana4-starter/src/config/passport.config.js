import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { env } from "./env.js";
import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/hash.js";

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {    
    token = req.cookies[env.cookieName]
  }
  return token
}

const bearerOrCookie = (req) => {
  const fromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  return fromHeader || cookieExtractor(req);
};

const jwtOptions = {
  jwtFromRequest: bearerOrCookie,
  secretOrKey: env.jwtSecret,
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

export const initPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, role } = req.body;

          if (!first_name || !last_name || !email || !password) {
            return done(null, false, { message: "Faltan campos obligatorios" });
          }

          const existing = await UserModel.findOne({ email: email.toLowerCase() });
          if (existing) {
            return done(null, false, { message: "El email ya está registrado" });
          }

          const user = await UserModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: createHash(password),
            role: role || "user",
          });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use("jwt", new JwtStrategy(jwtOptions, jwtVerify));
  passport.use("current", new JwtStrategy(jwtOptions, jwtVerify));




  passport.use('current',  new JwtStrategy({      
    jwtFromRequest: cookieExtractor,      secretOrKey: env.jwtSecret  },
    // jwtPayload -> el objeto de donde obtenemos el id del usuario o la informacion para realiazr la logica de validacion
    // done -> el callback para manejar el resultado de la validacion
    async (jwtPayload, done) => {      
      try {        
        const user = await UserModel.findById(jwtPayload.id)
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
};
