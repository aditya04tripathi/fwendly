import { Router } from "express";
import { createUnit, getUnit, updateUnit, deleteUnit } from "./controller.js";
const router = Router();

router.get("/:id", getUnit);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);

router.post("/", createUnit);

export default router;
