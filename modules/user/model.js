import { Schema, model } from "mongoose";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course",
	},
	startYear: {
		type: Number,
		default: 0,
	},
	endYear: {
		type: Number,
		default: 0,
	},
	studentType: {
		type: [Schema.Types.ObjectId],
		ref: "StudentType",
		default: [],
	},
	interests: {
		type: [Schema.Types.ObjectId],
		ref: "Interest",
		default: [],
	},
	units: {
		type: [Schema.Types.ObjectId],
		ref: "Unit",
		default: [],
	},
	freeSlots: {
		type: [Schema.Types.ObjectId],
		ref: "FreeSlot",
		default: [],
	},
	eventsHosted: {
		type: [Schema.Types.ObjectId],
		ref: "Event",
		default: [],
	},
	eventsAttended: {
		type: [Schema.Types.ObjectId],
		ref: "Event",
		default: [],
	},
	followers: {
		type: [Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
	following: {
		type: [Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
});

// Add method to hide password when converting to JSON
userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.hashedPassword;
	return user;
};

export default model("User", userSchema);
