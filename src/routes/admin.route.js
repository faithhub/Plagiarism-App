import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middleware";
import dashboardController from "../controllers/Admin/dashboard.controller";
import lecturerController from "../controllers/Admin/lecturer.controller";
import studentController from "../controllers/Admin/student.controller";
import authMiddleware from "../middlewares/auth.middleware";
import adminValidation from "../validations/admin.validation";

const router = Router();
const module = "admin";

router.get("/", authMiddleware.auth, dashboardController.index);

router.get("/lecturers", authMiddleware.auth, lecturerController.index);

router.get("/add-lecturer", authMiddleware.auth, lecturerController.create);

router.get("/edit/lecturer/:id", authMiddleware.auth, lecturerController.edit);

router.get(
  "/delete/lecturer/:id",
  authMiddleware.auth,
  lecturerController.delete
);

router.post(
  "/add-lecturer",
  authMiddleware.auth,
  adminValidation("createLecturer"),
  adminMiddleware.createLecturer,
  lecturerController.create
);

router.post(
  "/edit/lecturer",
  authMiddleware.auth,
  adminValidation("updateLecturer"),
  adminMiddleware.updateLecturer,
  lecturerController.edit
);

router.post(
  "/add-student",
  authMiddleware.auth,
  adminValidation("createStudent"),
  adminMiddleware.createStudent,
  studentController.create
);

router.get("/add-student", authMiddleware.auth, studentController.create);

router.get("/students", authMiddleware.auth, studentController.index);

router.get(
  "/delete/student/:id",
  authMiddleware.auth,
  studentController.delete
);
router.get(
  "/edit/student/:id",
  authMiddleware.auth,
  adminMiddleware.checkUser,
  studentController.edit
);

router.post(
  "/edit/student",
  authMiddleware.auth,
  adminValidation("updateStudent"),
  adminMiddleware.updateStudent,
  studentController.edit
);

router.get("/profile", authMiddleware.auth, dashboardController.profile);

router.post(
  "/profile",
  authMiddleware.auth,
  adminValidation("updateProfile"),
  adminMiddleware.updateProfile,
  dashboardController.profile
);

router.get(
  "/password",
  authMiddleware.auth,
  dashboardController.updatePassword
);

router.post(
  "/password",
  authMiddleware.auth,
  adminValidation("updatePassword"),
  adminMiddleware.updatePassword,
  dashboardController.updatePassword
);

export { module, router };
