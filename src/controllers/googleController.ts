import { RequestHandler } from "express";
import passport from "passport";

const handleRedirect: RequestHandler = (req, res, next) => {
  res.redirect("http://localhost:3000");
  console.log(req.isAuthenticated());
};

export { handleRedirect };
