import User from "./model.js";

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
