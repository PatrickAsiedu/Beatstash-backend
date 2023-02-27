import { Response, Request, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // if(req.isAuthenticated()) return res.json({'message':'u have acces'})
  // res.json({'message':'unauthorized'})
  if (req.isAuthenticated()) {
    next();
  } else return res.json({ message: "unauthorized" });
};

export default isAuthenticated;
