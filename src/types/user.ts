import { ObjectId } from "./index.js";

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	hashedPassword: string;
	course?: ObjectId;
	startYear: number;
	endYear: number;
	studentType: ObjectId[];
	interests: ObjectId[];
	units: ObjectId[];
	freeSlots: ObjectId[];
	eventsHosted: ObjectId[];
	eventsAttended: ObjectId[];
	followers: ObjectId[];
	following: ObjectId[];
}

export interface UserCreateRequest {
	name: string;
	email: string;
	password: string;
}

export interface UserUpdateRequest {
	name?: string;
	email?: string;
	course?: ObjectId;
	startYear?: number;
	endYear?: number;
	studentType?: ObjectId[];
	interests?: ObjectId[];
	units?: ObjectId[];
	freeSlots?: ObjectId[];
}
