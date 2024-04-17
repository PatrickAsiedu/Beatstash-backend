"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const passport_1 = __importDefault(require("passport"));
// @desc Login
// @route POST /auth
// @access Public
const handleLogin = (req, res, next) => {
    console.log("login called");
    passport_1.default.authenticate("local", (err, user, info) => {
        if (!user)
            return res.status(401).json({ message: "user nor found" });
        req.logIn(user, (err) => {
            if (err)
                throw err;
            res.status(201).json({ mesage: "user logged in" });
        });
    })(req, res, next);
};
exports.handleLogin = handleLogin;
