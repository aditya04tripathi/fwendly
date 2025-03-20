import User from "./model.js";
import { genSalt, hash, compare } from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (await User.findOne({ email })) {
			throw new Error("User already exists. Please login.");
		}

		const user = await User.create({
			name,
			email,
			hashedPassword: password,
		});

		return res.status(201).json({ msg: user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: error.message });
	}
};

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({ _id: id });
		if (!user) throw new Error("User not found. Try to register.");

		return res.status(200).json({ msg: user });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getUsers = async (req, res) => {
	try {
		const user = await User.find();

		return res.status(200).json({ msg: user });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			name,
			email,
			course,
			startYear,
			endYear,
			studentType,
			interests,
			units,
			freeSlots,
		} = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;
		if (email !== null && email !== undefined) updateFields.email = email;
		if (course !== null && course !== undefined) updateFields.course = course;
		if (startYear !== null && startYear !== undefined)
			updateFields.startYear = startYear;
		if (endYear !== null && endYear !== undefined)
			updateFields.endYear = endYear;
		if (studentType !== null && studentType !== undefined)
			updateFields.studentType = studentType;
		if (interests !== null && interests !== undefined)
			updateFields.interests = interests;
		if (units !== null && units !== undefined) updateFields.units = units;
		if (freeSlots !== null && freeSlots !== undefined)
			updateFields.freeSlots = freeSlots;

		const user = await User.findOneAndUpdate({ _id: id }, updateFields, {
			new: true,
		});
		if (!user) throw new Error("User not found. Try to register.");

		return res.status(200).json({ msg: user });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOneAndDelete({ _id: id });
		if (!user) throw new Error("User not found. Try to register.");

		return res.status(200).json({ msg: "User deleted successfully." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const followUser = async (req, res) => {
	try {
		const { id } = req.params; // user to follow
		const { followerId } = req.body; // user who is following

		if (!followerId) throw new Error("Follower ID is required.");

		// Check if users exist
		const userToFollow = await User.findById(id);
		const follower = await User.findById(followerId);

		if (!userToFollow || !follower) {
			throw new Error("One or both users not found.");
		}

		// Check if already following
		if (userToFollow.followers.includes(followerId)) {
			throw new Error("Already following this user.");
		}

		// Add follower to user's followers array
		await User.findByIdAndUpdate(id, {
			$push: { followers: followerId },
		});

		// Add user to follower's following array
		await User.findByIdAndUpdate(followerId, {
			$push: { following: id },
		});

		return res.status(200).json({ msg: "Successfully followed user." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const unfollowUser = async (req, res) => {
	try {
		const { id } = req.params; // user to unfollow
		const { followerId } = req.body; // user who is unfollowing

		if (!followerId) throw new Error("Follower ID is required.");

		const userToUnfollow = await User.findById(id);
		const follower = await User.findById(followerId);

		if (!userToUnfollow || !follower) {
			throw new Error("One or both users not found.");
		}

		// Check if actually following
		if (!userToUnfollow.followers.includes(followerId)) {
			throw new Error("Not following this user.");
		}

		await User.findByIdAndUpdate(id, {
			$pull: { followers: followerId },
		});

		await User.findByIdAndUpdate(followerId, {
			$pull: { following: id },
		});

		return res.status(200).json({ msg: "Successfully unfollowed user." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const signup = async (req, res) => {
	try {
		const { name, email, password, course, startYear, endYear } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ msg: "User already exists" });
		}

		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		const newUser = new User({
			name,
			email,
			hashedPassword,
			course,
			startYear,
			endYear,
		});

		await newUser.save();

		res.status(201).json({
			msg: newUser,
		});
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ msg: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		const isMatch = await compare(password, user.hashedPassword);
		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		res.status(200).json({
			msg: user,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};

export const getCurrentUser = async (req, res) => {
	try {
		const userId = req.query.userId;

		if (!userId) {
			return res.status(400).json({ msg: "User ID is required" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		res.status(200).json({ user });
	} catch (error) {
		console.error("Get current user error:", error);
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};
