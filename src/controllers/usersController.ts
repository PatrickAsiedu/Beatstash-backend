import { RequestHandler } from "express";

// @desc Get all users
// @route GET /users
// @access Public
const getAllUsers: RequestHandler = async (req, res, next) => {};

// @desc Get a users
// @route GET /users/id
// @access Public
const getUser: RequestHandler = async (req, res, next) => {};

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
