var express = require("express");
var router = express.Router();

const webhookHandler = require("./handler/webhook");

/* GET users listing. */
router.post("/", webhookHandler.webhook);

module.exports = router;
