const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/Auth/auth.controller");
const authValidation = require("../validations/auth.validation");

router.get("/", authMiddleware.noAuth, authController.login);

router.post(
  "/",
  authMiddleware.noAuth,
  authValidation("login"),
  authMiddleware.validate,
  authController.login
);

module.exports= router;
