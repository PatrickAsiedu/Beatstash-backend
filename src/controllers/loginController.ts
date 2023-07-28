import { Response, Request, NextFunction } from "express";
import passport from "passport";

const loginConroller = (req: Request, res: Response, next: NextFunction) => {
  console.log("logincontroller called");
  console.log(req.body)
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    req.logIn(user, (err) => {
      if (err) throw err;
      // res.status(201).json({ mesage: "user logged in" });
      res.status(201).json({user});
    });
  })(req, res, next);
};

export default loginConroller;
