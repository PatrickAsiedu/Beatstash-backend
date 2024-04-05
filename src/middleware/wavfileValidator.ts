import { RequestHandler } from "express";
import { Files } from "../types/multerMultiFieldTypes";

const wavfileValidator: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as Files;

  if (typeof submittedFiles["wav"] !== "undefined") {
    const wav = submittedFiles["wav"][0];
    if (!wav.originalname.endsWith(".wav"))
      return res.status(400).json({ message: "wav file is required" });
  }

  next();
};
export default wavfileValidator;
