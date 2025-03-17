import { Schema, model } from "mongoose";

const courseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unqiue: true,
		},
		people: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: true }
);

export default model("Course", courseSchema);
