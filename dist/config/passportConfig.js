"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
const passportConfig = (passport) => {
    passport.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const foundUser = yield User_1.default.findOne({ email: email }).exec();
            if (!foundUser)
                return done(null, false, { message: "user not found" });
            if (foundUser.password !== undefined) {
                const passwordmatch = yield bcrypt_1.default.compare(password, foundUser.password);
                if (passwordmatch) {
                    // console.log(foundUser)
                    //generate otp
                    //send email
                    return done(null, foundUser, { message: "user  found" });
                }
                else {
                    return done(null, false, {
                        message: "incorrect username or password",
                    });
                }
            }
            else
                return;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    })));
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("passport google called");
            if (profile.emails === undefined) {
                return;
            }
            else {
                const useremail = profile.emails[0].value;
                try {
                    const foundUser = yield User_1.default.findOne({ email: useremail });
                    if (!foundUser) {
                        const newUser = yield User_1.default.create({
                            email: useremail,
                        });
                        console.log(`new user create ${newUser}`);
                        return done(null, newUser);
                    }
                    else {
                        console.log(foundUser);
                        return done(null, foundUser);
                    }
                }
                catch (err) {
                    if (err instanceof Error)
                        console.log(err.message);
                }
            }
        });
    }));
    passport.serializeUser((foundUser, done) => {
        process.nextTick(() => {
            console.log("serializer called");
            done(null, { id: foundUser._id });
        });
    });
    passport.deserializeUser((id, done) => {
        process.nextTick(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("deserializer called");
            // console.log(id)
            try {
                const user = yield User_1.default.findById(id.id);
                done(null, user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`this is an error ${error.message}`);
                }
            }
        }));
    });
};
exports.passportConfig = passportConfig;
