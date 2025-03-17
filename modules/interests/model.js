import { Schema, model } from "mongoose";

const interestsSchema = new Schema({
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

export default model("Interest", interestsSchema);
