import { Response, Request, NextFunction } from "express";
import passport from "passport";

const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log("login called");
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (!user) return res.status(401).json({ message: "user nor found" });
    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({ mesage: "user logged in" });
    });
  })(req, res, next);
};

export { handleLogin };
