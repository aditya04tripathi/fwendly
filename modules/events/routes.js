import { Router } from "express";
import {
	createEvent,
	getEvent,
	updateEvent,
	deleteEvent,
	addComment,
} from "./controller.js";
const router = Router();

router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/comments", addComment);

router.post("/", createEvent);

export default router;
