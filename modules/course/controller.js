import Course from "./model.js";

export const createCourse = async (req, res) => {
	try {
		const { name, code } = req.body;

		if (await Course.findOne({ code })) {
			throw new Error("Course with this code already exists.");
		}

		const course = await Course.create({
			name,
			code,
		});

		return res.status(201).json({ msg: course });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getCourse = async (req, res) => {
	try {
		const { id } = req.params;

		const course = await Course.findOne({ _id: id }).populate("people");
		if (!course) throw new Error("Course not found.");

		return res.status(200).json({ msg: course });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateCourse = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, code } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;
		if (code !== null && code !== undefined) updateFields.code = code;

		const course = await Course.findOneAndUpdate({ _id: id }, updateFields, {
			new: true,
		});
		if (!course) throw new Error("Course not found.");

		return res.status(200).json({ msg: course });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const deleteCourse = async (req, res) => {
	try {
		const { id } = req.params;

		const course = await Course.findOneAndDelete({ _id: id });
		if (!course) throw new Error("Course not found.");

		return res.status(200).json({ msg: "Course deleted successfully." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
