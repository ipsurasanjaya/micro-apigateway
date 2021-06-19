const express = require("express");
const router = express.Router();

const imageCoursesRouter = require("./handler/image-courses");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", imageCoursesRouter.create);
router.delete("/:id", imageCoursesRouter.destroy);

module.exports = router;
