import { Router } from "express";
import GoogleController from "../controllers/GoogleController";

const router = Router();

router.get("/", GoogleController);

export { router };
