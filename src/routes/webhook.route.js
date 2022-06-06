const express = require("express");
const webhookController = require("../controllers/webhook.controller");

const router = express.Router();

router.get("/", webhookController.index);

router.post("/", webhookController.create);

router.post("/all", webhookController.getAll);

module.exports = router;
