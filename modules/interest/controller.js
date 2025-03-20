import Interest from "./model.js";

export const createInterest = async (req, res) => {
	try {
		const { name } = req.body;

		if (await Interest.findOne({ name })) {
			throw new Error("Interest with this name already exists.");
		}

		const interest = await Interest.create({ name });

		return res.status(201).json({
			success: true,
			data: interest,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getInterest = async (req, res) => {
	try {
		const { id } = req.params;

		const interest = await Interest.findById(id).populate("events");
		if (!interest) throw new Error("Interest not found.");

		return res.status(200).json({
			success: true,
			data: interest,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getInterests = async (req, res) => {
	try {
		const interests = await Interest.find().populate("events");

		return res.status(200).json({
			success: true,
			data: interests,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const updateInterest = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;

		const interest = await Interest.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!interest) throw new Error("Interest not found.");

		return res.status(200).json({
			success: true,
			data: interest,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const deleteInterest = async (req, res) => {
	try {
		const { id } = req.params;

		const interest = await Interest.findByIdAndDelete(id);
		if (!interest) throw new Error("Interest not found.");

		return res.status(200).json({
			success: true,
			data: "Interest deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
