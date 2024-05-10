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
exports.getUser = exports.getAllUsers = void 0;
const findUser_1 = __importDefault(require("../services/user/findUser"));
// @desc Get all users
// @route GET /users
// @access Public
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllUsers = getAllUsers;
// @desc Get a users
// @route GET /users/id
// @access Public
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userName } = req.params;
    const user = yield (0, findUser_1.default)(userName);
    // console.log(user);
    user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "user not found" });
});
exports.getUser = getUser;
// @desc Get all users
// @route GET /users
// @access Public
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
// @desc Get all users
// @route GET /users
// @access Public
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
// @desc Get all users
// @route GET /users
// @access Public
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
