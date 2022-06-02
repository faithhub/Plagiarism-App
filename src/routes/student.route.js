import { Router } from "express";
import dashboardController from "../controllers/Student/Dashboard.controller";
import settingsController from "../controllers/Student/settings.controller";
import authMiddleware from "../middlewares/Auth.middleware";
import studentMiddleware from "../middlewares/student.middleware";
import validation from "../validations/admin.validation";

const router = Router();
const module = "student";

router.get("/", authMiddleware.auth, dashboardController.index);

router.get("/profile", authMiddleware.auth, settingsController.profile);

router.post(
  "/profile",
  authMiddleware.auth,
  validation("updateProfile"),
  studentMiddleware.updateProfile,
  settingsController.profile
);

router.get("/password", authMiddleware.auth, settingsController.updatePassword);

router.post(
  "/password",
  authMiddleware.auth,
  validation("updatePassword"),
  studentMiddleware.updatePassword,
  settingsController.updatePassword
);

export { module, router };
