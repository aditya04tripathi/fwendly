import Tag from "./model.js";

export const createTag = async (req, res) => {
	try {
		const { name } = req.body;

		if (await Tag.findOne({ name })) {
			throw new Error("Tag with this name already exists.");
		}

		const tag = await Tag.create({ name });

		return res.status(201).json({
			success: true,
			data: tag,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getTag = async (req, res) => {
	try {
		const { id } = req.params;

		const tag = await Tag.findById(id).populate("events");
		if (!tag) throw new Error("Tag not found.");

		return res.status(200).json({
			success: true,
			data: tag,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getTags = async (req, res) => {
	try {
		const tags = await Tag.find().populate("events");

		return res.status(200).json({
			success: true,
			data: tags,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
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

		return res.status(200).json({
			success: true,
			data: tag,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const deleteTag = async (req, res) => {
	try {
		const { id } = req.params;

		const tag = await Tag.findByIdAndDelete(id);
		if (!tag) throw new Error("Tag not found.");

		return res.status(200).json({
			success: true,
			data: "Tag deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
