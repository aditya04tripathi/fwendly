import Unit from "./model.js";

export const createUnit = async (req, res) => {
	try {
		const { name, code } = req.body;

		if (await Unit.findOne({ code })) {
			throw new Error("Unit with this code already exists.");
		}

		const unit = await Unit.create({
			name,
			code,
		});

		return res.status(201).json({ msg: unit });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getUnit = async (req, res) => {
	try {
		const { id } = req.params;

		const unit = await Unit.findById(id).populate("people");
		if (!unit) throw new Error("Unit not found.");

		return res.status(200).json({ msg: unit });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateUnit = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, code } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;
		if (code !== null && code !== undefined) updateFields.code = code;

		const unit = await Unit.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!unit) throw new Error("Unit not found.");

		return res.status(200).json({ msg: unit });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const deleteUnit = async (req, res) => {
	try {
		const { id } = req.params;

		const unit = await Unit.findByIdAndDelete(id);
		if (!unit) throw new Error("Unit not found.");

		return res.status(200).json({ msg: "Unit deleted successfully." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
