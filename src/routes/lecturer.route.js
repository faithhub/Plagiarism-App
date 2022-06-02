import { Router } from "express";
import controller from "../controllers/Lecturer/lecturer.controller";
import authMiddleware from "../middlewares/auth.middleware";
import settingsController from "../controllers/Lecturer/settings.controller";
import studentMiddleware from "../middlewares/student.middleware";
import validation from "../validations/admin.validation";

const router = Router();
const module = "lecturer";

router.get("/", authMiddleware.auth, controller.index);

router.get("/files", authMiddleware.auth, controller.files);

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
