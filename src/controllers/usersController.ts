import { RequestHandler } from "express";
import findUser from "../services/user/findUser";

// @desc Get all users
// @route GET /users
// @access Public
const getAllUsers: RequestHandler = async (req, res, next) => {};

// @desc Get a users
// @route GET /users/id
// @access Public
const getUser: RequestHandler = async (req, res, next) => {
  const { id: userName } = req.params;
  const user = await findUser(userName);
  // console.log(user);
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "user not found" });
};

// @desc Get all users
// @route GET /users
// @access Public
const createNewUser: RequestHandler = async (req, res, next) => {};

// @desc Get all users
// @route GET /users
// @access Public
const updateUser: RequestHandler = async (req, res, next) => {};

// @desc Get all users
// @route GET /users
// @access Public
const deleteUser: RequestHandler = async (req, res, next) => {};

export { getAllUsers, getUser };
