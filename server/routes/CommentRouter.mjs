import { Router } from "express";
import { CommentController } from "../controllers/CommentController.js";

const commentRouter = Router();

commentRouter.post("/:id", CommentController.create);
commentRouter.get("/:id", CommentController.getByPostId);

export default commentRouter;
