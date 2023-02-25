import { Strategy as LocalStrategy } from 'passport-local'
// import passport from 'passport';

import bcrypt from "bcrypt"
import User from '../model/User';


export const passportConfig=(passport:any)=>{
    
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: "password" }, async (email: string, password: string, done) => {
        try {
            const foundUser = await User.findOne({ email: email }).exec()
            if (!foundUser) return done(null, false, { message: 'user not found' })
            const passwordmatch = await bcrypt.compare(password, foundUser.password)
            if (passwordmatch) {
                // console.log(foundUser)
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


passport.serializeUser((foundUser:any, done:any) => {
    process.nextTick(() => {
        console.log('serializer called')
        done(null, { id: foundUser._id});
    });
});

passport.deserializeUser((id:any, done:any) => {

    process.nextTick(async () => {
        console.log('deserializer called')
        // console.log(id)
        try{
            const user= await User.findById(id.id)
            done(null,user)
        
            

        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`this is an error ${error.message}`)
            }


        }

        

    });
});



}


    





