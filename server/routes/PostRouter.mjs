import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import { postValidation } from "../middlewares/PostValidation.js"
import { upload } from "../middlewares/uploadMiddleware.js";

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
