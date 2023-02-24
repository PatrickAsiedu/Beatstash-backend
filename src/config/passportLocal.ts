import { Strategy as LocalStrategy } from 'passport-local'
import passport = require('passport');
import bcrypt from "bcrypt"
import User from '../model/User';




passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: "password" }, async (email: string, password: string, done) => {
        try {
            const foundUser = await User.findOne({ email: email }).exec()
            if (!foundUser) return done(null, false, { message: 'user not found' })
            const passwordmatch = await bcrypt.compare(password, foundUser.password)
            if (passwordmatch) {
                console.log(foundUser)
                //generate otp
                //send email
                return done(null, foundUser, { message: 'user  found' })
            } else {
                return done(null, false, { message: 'incorrect username or password' })
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }


        }

    }))


// passport.serializeUser((foundUser, done) => {
//     process.nextTick(() => {
//         done(null, { id: foundUser.id, username: foundUser.email });
//     });
// });

// passport.deserializeUser((foundUser, done) => {
//     process.nextTick(() => {
//         done(null, { id: foundUser.id, username: foundUser.email });
//     });
// });
