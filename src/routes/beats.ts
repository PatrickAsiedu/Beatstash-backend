import { Router } from "express";
import * as BeatsController from "../controllers/beatsController";
import multer from "multer";
import fileExists from "../middleware/filesExists";

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

  BeatsController.AddNewBeat
);

export { router };
