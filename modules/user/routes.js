import { Router } from "express";
import {
	deleteUser,
	getUser,
	updateUser,
	createUser,
	getUsers,
	followUser,
	unfollowUser,
} from "./controller.js";
const router = Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;
