const express = require("express");
const router = express.Router();

const reviewHandler = require("./handler/reviews");

/* GET users listing. */

router.post("/", reviewHandler.create);
router.put("/:id", reviewHandler.update);
router.delete("/:id", reviewHandler.destroy);
module.exports = router;
