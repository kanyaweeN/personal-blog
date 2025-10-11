import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcryptjs";
import { ProfileController } from "../controllers/ProfileController.js";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getAll);
profileRouter.get("/:id", ProfileController.getById);
profileRouter.put("/:id", ProfileController.updateById);

export default profileRouter;
