const express = require("express");
const authMiddleware = require("../middlewares/Auth.middleware");
const authController = require("../controllers/Auth/Auth.controller");

const router = express.Router();

router.get("/", authController.logout);

module.exports = router;
