import { RequestHandler } from "express";
import passport from "passport";

const GoogleCOntroller: RequestHandler = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] });
  console.log("google controller called");
  // next();
};

export default GoogleCOntroller;
