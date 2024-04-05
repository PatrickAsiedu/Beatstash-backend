import { RequestHandler } from "express";
import { Files } from "../types/multerMultiFieldTypes";

const mp3fileValidator: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as Files;

  if (typeof submittedFiles["mp3"] === "undefined") {
    return res.status(400).json({ message: "mp3 file is required" });
  }

  const mp3 = submittedFiles["mp3"][0];
  if (!mp3.originalname.endsWith(".mp3"))
    return res.status(400).json({ message: "mp3 file is required" });
  next();
};
export default mp3fileValidator;
