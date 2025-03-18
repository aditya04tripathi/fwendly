import { Router } from "express";
import {
	createCourse,
	getCourse,
	getCourses,
	updateCourse,
	deleteCourse,
} from "./controller.js";
const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

router.post("/", createCourse);

export default router;
