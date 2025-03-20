import { Router } from "express";
import {
	createUnit,
	getUnit,
	updateUnit,
	deleteUnit,
	getUnits,
} from "./controller.js";
const router = Router();

router.get("/", getUnits);
router.get("/:id", getUnit);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);

router.post("/", createUnit);

export default router;
