import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoriesController.getAll);

export default categoriesRouter;
