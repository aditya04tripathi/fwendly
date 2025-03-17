import { Router } from "express";
import { deleteUser, getUser, updateUser, createUser } from "./controller.js";
const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/", createUser);

export default router;
