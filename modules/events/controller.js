import Event from "./model.js";
import User from "../user/model.js";

export const createEvent = async (req, res) => {
	try {
		const { name, venue, time, host } = req.body;

		const event = await Event.create({
			name,
			venue,
			time,
			host,
		});

		// Add event to host's eventsHosted array
		await User.findByIdAndUpdate(host, {
			$push: { eventsHosted: event._id },
		});

		return res.status(201).json({ msg: event });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getEvent = async (req, res) => {
	try {
		const { id } = req.params;

		const event = await Event.findById(id)
			.populate("host")
			.populate("attendees")
			.populate("type")
			.populate("tags");

		if (!event) throw new Error("Event not found.");

		return res.status(200).json({ msg: event });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getEvents = async (req, res) => {
	try {
		const events = await Event.find()
			.populate("host")
			.populate("attendees")
			.populate("type")
			.populate("tags");

		return res.status(200).json({ msg: events });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, venue, time, type, durationMinutes, isEnded, rating, tags } =
			req.body;

		const updateFields = {};
		if (name !== null && name !== undefined) updateFields.name = name;
		if (venue !== null && venue !== undefined) updateFields.venue = venue;
		if (time !== null && time !== undefined) updateFields.time = time;
		if (type !== null && type !== undefined) updateFields.type = type;
		if (durationMinutes !== null && durationMinutes !== undefined)
			updateFields.durationMinutes = durationMinutes;
		if (isEnded !== null && isEnded !== undefined)
			updateFields.isEnded = isEnded;
		if (rating !== null && rating !== undefined) updateFields.rating = rating;
		if (tags !== null && tags !== undefined) updateFields.tags = tags;

		const event = await Event.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!event) throw new Error("Event not found.");

		return res.status(200).json({ msg: event });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;

		const event = await Event.findByIdAndDelete(id);
		if (!event) throw new Error("Event not found.");

		// Remove event from host's eventsHosted array
		await User.findByIdAndUpdate(event.host, {
			$pull: { eventsHosted: id },
		});

		// Remove event from attendees' eventsAttended array
		if (event.attendees.length > 0) {
			await User.updateMany(
				{ _id: { $in: event.attendees } },
				{ $pull: { eventsAttended: id } }
			);
		}

		return res.status(200).json({ msg: "Event deleted successfully." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const addComment = async (req, res) => {
	try {
		const { id } = req.params;
		const { user, comment } = req.body;

		if (!comment) throw new Error("Comment is required.");

		const event = await Event.findByIdAndUpdate(
			id,
			{ $push: { comments: { user, comment } } },
			{ new: true }
		);

		if (!event) throw new Error("Event not found.");

		return res.status(200).json({ msg: event });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const joinEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;

		if (!userId) throw new Error("User ID is required.");

		// Check if user is already in attendees
		const event = await Event.findById(id);
		if (!event) throw new Error("Event not found.");

		if (event.attendees.includes(userId)) {
			throw new Error("User already attending this event.");
		}

		// Add user to event attendees
		await Event.findByIdAndUpdate(id, {
			$push: { attendees: userId },
		});

		// Add event to user's eventsAttended array
		await User.findByIdAndUpdate(userId, {
			$push: { eventsAttended: id },
		});

		return res.status(200).json({ msg: "Successfully joined event." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const leaveEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;

		if (!userId) throw new Error("User ID is required.");

		// Check if user is in attendees
		const event = await Event.findById(id);
		if (!event) throw new Error("Event not found.");

		if (!event.attendees.includes(userId)) {
			throw new Error("User is not attending this event.");
		}

		// Remove user from event attendees
		await Event.findByIdAndUpdate(id, {
			$pull: { attendees: userId },
		});

		// Remove event from user's eventsAttended array
		await User.findByIdAndUpdate(userId, {
			$pull: { eventsAttended: id },
		});

		return res.status(200).json({ msg: "Successfully left event." });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
