import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import { postValidation } from "../middlewares/PostValidation.js"
import multer from "multer";

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

const postRouter = Router();

postRouter.post("/",
    upload.single("imageFile"),
    PostController.createPost);
postRouter.get("/", PostController.getAll);
postRouter.get("/:id", PostController.getById);
postRouter.patch("/:id/like", PostController.updateLikeById);
postRouter.put("/:id",
    upload.single("imageFile"),
    PostController.updateById);
postRouter.delete("/:id", PostController.deleteById);

export default postRouter;
