import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController.js";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// ตั้งค่า multer เก็บไฟล์ในหน่วยความจำ
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        // ตรวจสอบประเภทไฟล์
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

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
