import { Router } from "express";
import authMiddleware from "../middlewares/Auth.middleware";
import AuthController from "../controllers/Auth/Auth.controller";
import authValidation from "../validations/auth.validation";

const router = Router();
const module = "register";

router.get("/", authMiddleware.noAuth, AuthController.register);

router.post(
  "/",
  authMiddleware.noAuth,
  authValidation("register"),
  AuthController.register
);

export { module, router };
