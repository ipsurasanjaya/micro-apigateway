const express = require("express");
const router = express.Router();

const lessonsHandler = require("./handler/lessons");

router.get("/:id", lessonsHandler.get);
router.get("/", lessonsHandler.getAll);

router.post("/", lessonsHandler.create);
router.delete("/:id", lessonsHandler.destroy);
router.put("/:id", lessonsHandler.update);

module.exports = router;
