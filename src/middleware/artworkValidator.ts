import { RequestHandler } from "express";
import { Files } from "../types/multerMultiFieldTypes";

const artworkValidator: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as Files;
  if (typeof submittedFiles["artwork"] === "undefined") {
    return res.status(400).json({ message: "artwork is required" });
  }

  const artwork = submittedFiles["artwork"][0];
  if (!artwork.originalname.endsWith(".jpg"))
    return res.status(400).json({ message: "artwork must be a jpg file " });
  next();
};
export default artworkValidator;
