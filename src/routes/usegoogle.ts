import { Router } from "express";
import * as GoogleCOntroller from "../controllers/googleController";
import passport from "passport";

const router = Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "http://localhost:3000/signin",
  }),
  GoogleCOntroller.handleRedirect
);

export { router };
