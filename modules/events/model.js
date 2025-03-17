import { Schema, model } from "mongoose";

const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	venue: {
		type: String,
		required: true,
		trim: true,
	},
	time: {
		type: String,
		required: true,
		trim: true,
	},
	type: {
		type: [Schema.Types.ObjectId],
		ref: "EventType",
		default: [],
	},
	attendees: {
		type: [Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
	durationMinutes: {
		type: Number,
		default: 2,
	},
	isEnded: {
		type: Boolean,
		default: false,
	},
	host: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	comments: {
		type: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
	},
	images: {
		type: [String],
		default: [],
	},
	tags: {
		type: [Schema.Types.ObjectId],
		ref: "Tag",
		default: [],
	},
});

export default model("Event", eventSchema);
