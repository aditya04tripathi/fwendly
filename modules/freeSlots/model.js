import { Schema, model } from "mongoose";

const freeSlotsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	people: {
		type: [Schema.Types.ObjectId],
		ref: "Person",
		default: [],
	},
});

export default model("FreeSlot", freeSlotsSchema);
