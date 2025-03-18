import { ObjectId } from "./index.js";

export interface EventType {
	_id: ObjectId;
	name: string;
	events: ObjectId[];
}

export interface EventTypeCreateRequest {
	name: string;
}

export interface EventTypeUpdateRequest {
	name?: string;
}
