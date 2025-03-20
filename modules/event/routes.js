import { Router } from "express";
import {
	createEvent,
	getEvent,
	getEvents,
	updateEvent,
	deleteEvent,
	addComment,
	joinEvent,
	leaveEvent,
} from "./controller.js";

const router = Router();

router.get("/:id", getEvent);
router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/comments", addComment);
router.post("/:id/join", joinEvent);
router.post("/:id/leave", leaveEvent);

export default router;
