import { RequestHandler } from "express";

const mp3fileValidator: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  if (typeof submittedFiles !== "undefined") {
    const mp3 = submittedFiles["mp3"][0];
    if (!mp3 || !mp3.originalname.endsWith(".mp3"))
      return res.status(400).json({ message: "mp3 file is required" });
    next();
  }
};
export default mp3fileValidator;
