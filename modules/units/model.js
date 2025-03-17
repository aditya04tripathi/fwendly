import { Schema, model } from "mongoose";

const unitsSchema = new Schema({
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
		ref: "User",
		default: [],
	},
});

export default model("Unit", unitsSchema);
