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
exports.handleSIgnUp = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleSIgnUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password, username } = req.body;
    // validate fields
    //check if required fields exist
    if (!email || !password) {
        return res.status(400).json({ message: "email and password are rquired" });
    }
    try {
        //check for duplicates of email in db
        const duplicate = yield User_1.default.findOne({ email: email }).exec();
        if (duplicate) {
            return res
                .status(409)
                .json({ message: "an account with this email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.default.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        console.log(newUser);
        res.status(201).json({ success: `New user ${email} created` });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
});
exports.handleSIgnUp = handleSIgnUp;
