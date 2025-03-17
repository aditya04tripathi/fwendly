import { Router } from "express";
import {
	createInterest,
	getInterest,
	updateInterest,
	deleteInterest,
} from "./controller.js";
const router = Router();

router.get("/:id", getInterest);
router.put("/:id", updateInterest);
router.delete("/:id", deleteInterest);

router.post("/", createInterest);

export default router;
