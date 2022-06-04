const express = require("express");
const dashboardController = require("../controllers/Student/dashboard.controller");
const settingsController = require("../controllers/Student/settings.controller");
const workController = require("../controllers/Student/work.controller");
const authMiddleware = require("../middlewares//auth.middleware");
const studentMiddleware = require("../middlewares/student.middleware");
const validation = require("../validations/admin.validation");

const router = express.Router();

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

router.get("/works", authMiddleware.auth, workController.index);
router.get("/submit-work", authMiddleware.auth, workController.create);

module.exports = router;
