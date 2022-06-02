import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import authController from "../controllers/Auth/auth.controller";
import authValidation from "../validations/auth.validation";

const router = Router();
const module = "login";

router.get("/", authMiddleware.noAuth, authController.login);

router.post(
  "/",
  authMiddleware.noAuth,
  authValidation("login"),
  authMiddleware.validate,
  authController.login
);

export { module, router };
