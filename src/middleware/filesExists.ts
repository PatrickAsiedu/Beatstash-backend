import { RequestHandler } from "express";

const fileExists: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (Object.values(submittedFiles).length === 0)
    return res.status(400).json({ message: "Missing files" });
  next();
};

export default fileExists;
