import { Router } from "express";
import authMiddleware from "../middlewares/Auth.middleware";
import authController from "../controllers/Auth/Auth.controller";

const router = Router();
const module = "logout";

router.get("/", authController.logout);

export { module, router };
