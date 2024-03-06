import express from "express";
const router = express.Router();
import passport from "passport";
import * as LoginContoller from "../controllers/loginController";
import { Response, Request, NextFunction } from "express";

router.post("/", LoginContoller.handleLogin);

export { router };
