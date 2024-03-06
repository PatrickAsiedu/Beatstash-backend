import express from "express";
import * as SignupController from "../controllers/signupController";

const router = express.Router();

router.post("/", SignupController.handleSIgnUp);

export { router };
