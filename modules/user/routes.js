import express from "express";
import {
	signup,
	login,
	getCurrentUser,
	deleteUser,
	getUser,
	updateUser,
	createUser,
	getUsers,
	followUser,
	unfollowUser,
} from "./controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getCurrentUser);

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;
