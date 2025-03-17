import { Router } from "express";
import {
	createCourse,
	getCourse,
	updateCourse,
	deleteCourse,
} from "./controller.js";
const router = Router();

router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

router.post("/", createCourse);

export default router;
