import { Router } from "express";
import * as userController from "../../controllers/usersController";
const router = Router();

router.route("/").get().post();

router.route("/:id").get(userController.getUser);

export { router };
