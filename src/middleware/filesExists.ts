import { RequestHandler } from "express";

const fileExists: RequestHandler = (req, res, next) => {
  if (req.files?.length === 0)
    return res.status(400).json({ message: "Missing files" });
  console.log(req.files);
  next();
};

export default fileExists;
