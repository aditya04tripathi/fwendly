import EventType from "./model.js";

export const createEventType = async (req, res) => {
	try {
		const { name } = req.body;

		if (await EventType.findOne({ name })) {
			throw new Error("Event type with this name already exists.");
		}

		const eventType = await EventType.create({ name });

		return res.status(201).json({
			success: true,
			data: eventType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getEventType = async (req, res) => {
	try {
		const { id } = req.params;

		const eventType = await EventType.findById(id).populate("events");
		if (!eventType) throw new Error("Event type not found.");

		return res.status(200).json({
			success: true,
			data: eventType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getEventTypes = async (req, res) => {
	try {
		const eventTypes = await EventType.find().populate("events");

		return res.status(200).json({
			success: true,
			data: eventTypes,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const updateEventType = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;

		const eventType = await EventType.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!eventType) throw new Error("Event type not found.");

		return res.status(200).json({
			success: true,
			data: eventType,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const deleteEventType = async (req, res) => {
	try {
		const { id } = req.params;

		const eventType = await EventType.findByIdAndDelete(id);
		if (!eventType) throw new Error("Event type not found.");

		return res.status(200).json({
			success: true,
			data: "Event type deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
