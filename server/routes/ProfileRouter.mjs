import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController.js";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getAll);
profileRouter.get("/:id", ProfileController.getById);
profileRouter.put("/:id",
    upload.single("imageFile"),
    ProfileController.updateById);

profileRouter.put(
    "/:id/reset-password",
    authMiddleware,
    ProfileController.resetPassword
);

export default profileRouter;
