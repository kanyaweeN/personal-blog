import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import { PostValidation } from "../middlewares/PostValidation.js"

const postRouter = Router();

postRouter.post("/", PostController.createPost);
postRouter.get("/", PostController.getAll);
postRouter.get("/:id", PostController.getById);
postRouter.patch("/:id/like", PostController.updateLikeById);
postRouter.put("/:id", PostController.updateById);
postRouter.delete("/:id", PostController.deleteById);

export default postRouter;
