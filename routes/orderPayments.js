var express = require("express");
var router = express.Router();

const orderPaymentsHandler = require("./handler/order-payment");

/* GET users listing. */
router.get("/", orderPaymentsHandler.getOrders);

module.exports = router;
