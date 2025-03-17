import { Router } from "express";
import {
	createFreeSlot,
	getFreeSlot,
	updateFreeSlot,
	deleteFreeSlot,
} from "./controller.js";
const router = Router();

router.get("/:id", getFreeSlot);
router.put("/:id", updateFreeSlot);
router.delete("/:id", deleteFreeSlot);

router.post("/", createFreeSlot);

export default router;
