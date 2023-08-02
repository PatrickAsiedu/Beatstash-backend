import { Response, Request, NextFunction } from "express";
import passport from "passport";
import { User } from "../types/UserTypes";

const authConroller = (req: Request, res: Response, next: NextFunction) => {
  console.log("logincontroller called");
  console.log(req.body)
  passport.authenticate("local", (err: any, user: User, info: any) => {
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    req.logIn(user, (err) => {
      if (err) throw err;
      // res.status(201).json({ mesage: "user logged in" });
      res.status(201).json({
         id:user._id, 
        email:user.email,
      roles: Object.values(user.roles).filter(Boolean)}); //filter and return truethy values from roles in db
      console.log(user)
    });
  })(req, res, next);
};

export default authConroller;
