import { Schema, model } from "mongoose";

const eventTypeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "Event",
		default: [],
	},
});

export default model("EventType", eventTypeSchema);
