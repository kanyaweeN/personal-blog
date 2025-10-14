import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController.js";

const categoriesRouter = Router();

categoriesRouter.post("/", CategoriesController.create);
categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get("/:id", CategoriesController.getById);
categoriesRouter.put("/:id", CategoriesController.updateById);
categoriesRouter.delete("/:id", CategoriesController.deleteById);

export default categoriesRouter;
