import { Router } from "express";
import * as postBeatController from "../controllers/postBeatController";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/", upload.single("beat"), postBeatController.handlePostBeat);

export { router };
