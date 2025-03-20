import { Router } from "express";
import {
	createEventType,
	getEventType,
	updateEventType,
	deleteEventType,
	getEventTypes,
} from "./controller.js";
const router = Router();

router.get("/", getEventTypes);
router.get("/:id", getEventType);
router.put("/:id", updateEventType);
router.delete("/:id", deleteEventType);

router.post("/", createEventType);

export default router;
