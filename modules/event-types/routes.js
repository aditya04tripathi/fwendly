import { Router } from "express";
import {
	createEventType,
	getEventType,
	updateEventType,
	deleteEventType,
} from "./controller.js";
const router = Router();

router.get("/:id", getEventType);
router.put("/:id", updateEventType);
router.delete("/:id", deleteEventType);

router.post("/", createEventType);

export default router;
