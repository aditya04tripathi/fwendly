import { ObjectId } from "./index.js";

export interface Interest {
	_id: ObjectId;
	name: string;
	people?: ObjectId[];
	events?: ObjectId[];
}

export interface InterestCreateRequest {
	name: string;
}

export interface InterestUpdateRequest {
	name?: string;
}
