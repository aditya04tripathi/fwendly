import { ObjectId } from "./index.js";

export interface Unit {
	_id: ObjectId;
	name: string;
	code: string;
	people?: ObjectId[];
}

export interface UnitCreateRequest {
	name: string;
	code: string;
}

export interface UnitUpdateRequest {
	name?: string;
	code?: string;
}
