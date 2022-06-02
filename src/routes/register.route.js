const express = require("express");
const AuthController = require("../controllers/Auth/Auth.controller");
const authValidation = require("../validations/auth.validation");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware.noAuth, AuthController.register);

router.post(
  "/",
  authMiddleware.noAuth,
  authValidation("register"),
  AuthController.register
);

module.exports = router;
