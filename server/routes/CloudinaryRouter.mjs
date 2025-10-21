import { Router } from "express";
import multer from "multer";
import { CloudinaryController } from "../controllers/CloudinaryController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const CloudinaryRouter = Router();

CloudinaryRouter.post("/", upload.single("file"), CloudinaryController.create);

export default CloudinaryRouter;