import { Router } from "express";
import {
	createTag,
	getTag,
	getTags,
	updateTag,
	deleteTag,
} from "./controller.js";
const router = Router();

router.get("/", getTags);
router.get("/:id", getTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

router.post("/", createTag);

export default router;
