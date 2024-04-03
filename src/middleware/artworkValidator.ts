import { RequestHandler } from "express";

const artworkValidator: RequestHandler = (req, res, next) => {
  const submittedFiles = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
};
export default artworkValidator;
