const express = require("express");
const router = express.Router();

const chapterHandler = require("./handler/chapters");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", chapterHandler.getAll);
router.get("/:id", chapterHandler.get);

router.post("/", chapterHandler.create);
router.delete("/:id", chapterHandler.destroy);
router.put("/:id", chapterHandler.update);
module.exports = router;
