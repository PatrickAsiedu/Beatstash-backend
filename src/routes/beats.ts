import { Router } from "express";
import * as BeatsController from "../controllers/beatsController";
import multer from "multer";
import fileExists from "../middleware/filesExists";
import mp3fileValidator from "../middleware/mp3fileValidator";
import artworkValidator from "../middleware/artworkValidator";
import wavfileValidator from "../middleware/wavfileValidator";

const maxFileSizeMB = 100000000;
const router = Router();
// const upload = multer({
//   fileFilter: (req, file, cb) => {
//     console.log(file);
//     cb(null, true);
//   },
// });
const upload = multer();

router.route("/").post(
  upload.fields([
    { name: "artwork", maxCount: 1 },
    { name: "mp3", maxCount: 1 },
    { name: "wav", maxCount: 1 },
  ]),
  fileExists,
  artworkValidator,
  mp3fileValidator,
  wavfileValidator,

  BeatsController.AddNewBeat
);

export { router };
