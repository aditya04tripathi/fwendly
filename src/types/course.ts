import { ObjectId } from "./index.js";

export interface Course {
	_id: ObjectId;
	name: string;
	code: string;
	people?: ObjectId[];
}

export interface CourseCreateRequest {
	name: string;
	code: string;
}

export interface CourseUpdateRequest {
	name?: string;
	code?: string;
}
