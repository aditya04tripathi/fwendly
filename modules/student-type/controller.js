import StudentType from "./model.js";

export const createStudentType = async (req, res) => {
	try {
		const { name } = req.body;

		if (!["Domestic", "International", "Transfer", "Exchange"].includes(name)) {
			throw new Error(
				"Invalid student type. Must be one of: Domestic, International, Transfer, Exchange"
			);
		}

		if (await StudentType.findOne({ name })) {
			throw new Error("Student type already exists.");
		}

		const studentType = await StudentType.create({ name });

		return res.status(201).json({
			success: true,
			data: studentType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getStudentType = async (req, res) => {
	try {
		const { id } = req.params;

		const studentType = await StudentType.findById(id).populate("people");
		if (!studentType) throw new Error("Student type not found.");

		return res.status(200).json({
			success: true,
			data: studentType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getStudentTypes = async (req, res) => {
	try {
		const studentTypes = await StudentType.find().populate("people");

		return res.status(200).json({
			success: true,
			data: studentTypes,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const updateStudentType = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (
			name &&
			!["Domestic", "International", "Transfer", "Exchange"].includes(name)
		) {
			throw new Error(
				"Invalid student type. Must be one of: Domestic, International, Transfer, Exchange"
			);
		}

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;

		const studentType = await StudentType.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!studentType) throw new Error("Student type not found.");

		return res.status(200).json({
			success: true,
			data: studentType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const deleteStudentType = async (req, res) => {
	try {
		const { id } = req.params;

		const studentType = await StudentType.findByIdAndDelete(id);
		if (!studentType) throw new Error("Student type not found.");

		return res.status(200).json({
			success: true,
			data: "Student type deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
