import { Router } from "express";
const router = Router();
import * as LogoutController from "../controllers/logoutController";

router.get("/", LogoutController.handleLogout);

export { router };
