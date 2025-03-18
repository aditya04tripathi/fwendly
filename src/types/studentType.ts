import { ObjectId } from "./index.js";

export type StudentTypeNames =
	| "Domestic"
	| "International"
	| "Transfer"
	| "Exchange";

export interface StudentType {
	_id: ObjectId;
	name: StudentTypeNames;
	people: ObjectId[];
}

export interface StudentTypeCreateRequest {
	name: StudentTypeNames;
}

export interface StudentTypeUpdateRequest {
	name?: StudentTypeNames;
}
