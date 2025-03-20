import FreeSlot from "./model.js";

export const createFreeSlot = async (req, res) => {
	try {
		const { name, code } = req.body;

		if (await FreeSlot.findOne({ code })) {
			throw new Error("Free slot with this code already exists.");
		}

		const freeSlot = await FreeSlot.create({
			name,
			code,
		});

		return res.status(201).json({
			success: true,
			data: freeSlot,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getFreeSlot = async (req, res) => {
	try {
		const { id } = req.params;

		const freeSlot = await FreeSlot.findById(id).populate("people");
		if (!freeSlot) throw new Error("Free slot not found.");

		return res.status(200).json({
			success: true,
			data: freeSlot,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getFreeSlots = async (req, res) => {
	try {
		const freeSlots = await FreeSlot.find().populate("people");

		return res.status(200).json({
			success: true,
			data: freeSlots,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const updateFreeSlot = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, code } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;
		if (code !== null && code !== undefined) updateFields.code = code;

		const freeSlot = await FreeSlot.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!freeSlot) throw new Error("Free slot not found.");

		return res.status(200).json({
			success: true,
			data: freeSlot,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const deleteFreeSlot = async (req, res) => {
	try {
		const { id } = req.params;

		const freeSlot = await FreeSlot.findByIdAndDelete(id);
		if (!freeSlot) throw new Error("Free slot not found.");

		return res.status(200).json({
			success: true,
			data: "Free slot deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
