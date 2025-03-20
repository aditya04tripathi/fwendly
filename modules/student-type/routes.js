import { Router } from "express";
import {
	createStudentType,
	getStudentTypes,
	getStudentType,
	updateStudentType,
	deleteStudentType,
} from "./controller.js";
const router = Router();

router.get("/", getStudentTypes);
router.get("/:id", getStudentType);
router.put("/:id", updateStudentType);
router.delete("/:id", deleteStudentType);

router.post("/", createStudentType);

export default router;
