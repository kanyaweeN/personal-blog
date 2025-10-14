import { Router } from "express";
import { CommentController } from "../controllers/CommentController.js";
import { StatusController } from "../controllers/StatusController.js";

const statusRouter = Router();

statusRouter.get("/", StatusController.getAll);

export default statusRouter;
