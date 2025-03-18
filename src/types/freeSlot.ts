import { ObjectId } from "./index.js";

export interface FreeSlot {
	_id: ObjectId;
	name: string;
	code: string;
	people?: ObjectId[];
}

export interface FreeSlotCreateRequest {
	name: string;
	code: string;
}

export interface FreeSlotUpdateRequest {
	name?: string;
	code?: string;
}
