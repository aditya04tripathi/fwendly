import Tag from "./model.js";

export const createTag = async (req, res) => {
	try {
		const { name } = req.body;

		if (await Tag.findOne({ name })) {
			throw new Error("Tag with this name already exists.");
		}

		const tag = await Tag.create({ name });

		return res.status(201).json({ msg: tag });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getTag = async (req, res) => {
	try {
		const { id } = req.params;

		const tag = await Tag.findById(id).populate("events");
		if (!tag) throw new Error("Tag not found.");

		return res.status(200).json({ msg: tag });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateTag = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;

		const tag = await Tag.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!tag) throw new Error("Tag not found.");

		return res.status(200).json({ msg: tag });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const deleteTag = async (req, res) => {
	try {
		const { id } = req.params;

		const tag = await Tag.findByIdAndDelete(id);
		if (!tag) throw new Error("Tag not found.");

		return res.status(200).json({ msg: "Tag deleted successfully." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
