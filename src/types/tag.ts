import { ObjectId } from "./index.js";

export interface Tag {
	_id: ObjectId;
	name: string;
	events?: ObjectId[];
}

export interface TagCreateRequest {
	name: string;
}

export interface TagUpdateRequest {
	name?: string;
}
