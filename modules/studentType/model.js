import { Schema, model } from "mongoose";

const studentTypeSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ["Domestic", "International", "Transfer", "Exchange"],
	},
	people: {
		type: [Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
});

export default model("StudentType", studentTypeSchema);
