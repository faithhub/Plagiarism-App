const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middlewares/admin.middleware");
// const dashboardController = require("../controllers/Admin/dashboard.controller");
// const lecturerController = require("../controllers/Admin/lecturer.controller");
// const studentController = require("../controllers/Admin/student.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminValidation = require("../validations/admin.validation");

// const router = Router();
// const module = "admin";

// router.get("/", authMiddleware.auth, dashboardController.index);

// router.get("/lecturers", authMiddleware.auth, lecturerController.index);

// router.get("/add-lecturer", authMiddleware.auth, lecturerController.create);

// router.get("/edit/lecturer/:id", authMiddleware.auth, lecturerController.edit);

// router.get(
//   "/delete/lecturer/:id",
//   authMiddleware.auth,
//   lecturerController.delete
// );

// router.post(
//   "/add-lecturer",
//   authMiddleware.auth,
//   adminValidation("createLecturer"),
//   adminMiddleware.createLecturer,
//   lecturerController.create
// );

// router.post(
//   "/edit/lecturer",
//   authMiddleware.auth,
//   adminValidation("updateLecturer"),
//   adminMiddleware.updateLecturer,
//   lecturerController.edit
// );

// router.post(
//   "/add-student",
//   authMiddleware.auth,
//   adminValidation("createStudent"),
//   adminMiddleware.createStudent,
//   studentController.create
// );

// router.get("/add-student", authMiddleware.auth, studentController.create);

// router.get("/students", authMiddleware.auth, studentController.index);

// router.get(
//   "/delete/student/:id",
//   authMiddleware.auth,
//   studentController.delete
// );
// router.get(
//   "/edit/student/:id",
//   authMiddleware.auth,
//   adminMiddleware.checkUser,
//   studentController.edit
// );

// router.post(
//   "/edit/student",
//   authMiddleware.auth,
//   adminValidation("updateStudent"),
//   adminMiddleware.updateStudent,
//   studentController.edit
// );

// router.get("/profile", authMiddleware.auth, dashboardController.profile);

// router.post(
//   "/profile",
//   authMiddleware.auth,
//   adminValidation("updateProfile"),
//   adminMiddleware.updateProfile,
//   dashboardController.profile
// );

// router.get(
//   "/password",
//   authMiddleware.auth,
//   dashboardController.updatePassword
// );

// router.post(
//   "/password",
//   authMiddleware.auth,
//   adminValidation("updatePassword"),
//   adminMiddleware.updatePassword,
//   dashboardController.updatePassword
// );

module.exports= router;
