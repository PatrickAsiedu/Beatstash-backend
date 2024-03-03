import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import bcrypt from "bcrypt";
import User from "../model/User";

export const passportConfig = (passport: any) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email: string, password: string, done) => {
        try {
          const foundUser = await User.findOne({ email: email }).exec();
          if (!foundUser)
            return done(null, false, { message: "user not found" });
          if (foundUser.password !== undefined) {
            const passwordmatch = await bcrypt.compare(
              password,
              foundUser.password
            );
            if (passwordmatch) {
              // console.log(foundUser)
              //generate otp
              //send email
              return done(null, foundUser, { message: "user  found" });
            } else {
              return done(null, false, {
                message: "incorrect username or password",
              });
            }
          } else return;
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("passport google called");
        if (profile.emails === undefined) {
          return;
        } else {
          const useremail = profile.emails[0].value;

          try {
            const foundUser = await User.findOne({ email: useremail });

            if (!foundUser) {
              const newUser = await User.create({
                email: useremail,
              });
              console.log(`new user create ${newUser}`);
              return done(null, newUser);
            } else {
              console.log(foundUser);
              return done(null, foundUser);
            }
          } catch (err) {
            if (err instanceof Error) console.log(err.message);
          }
        }
      }
    )
  );

  passport.serializeUser((foundUser: any, done: any) => {
    process.nextTick(() => {
      console.log("serializer called");
      done(null, { id: foundUser._id });
    });
  });

  passport.deserializeUser((id: any, done: any) => {
    process.nextTick(async () => {
      console.log("deserializer called");
      // console.log(id)
      try {
        const user = await User.findById(id.id);
        done(null, user);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`this is an error ${error.message}`);
        }
      }
    });
  });
};
