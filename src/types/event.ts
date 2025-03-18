import { ObjectId } from "./index.js";

export interface EventComment {
	user: ObjectId;
	comment: string;
}

export interface Event {
	_id: ObjectId;
	name: string;
	venue: string;
	time: string;
	type: ObjectId[];
	attendees: ObjectId[];
	durationMinutes: number;
	isEnded: boolean;
	host: ObjectId;
	rating: number;
	comments: EventComment[];
	images: string[];
	tags: ObjectId[];
}

export interface EventCreateRequest {
	name: string;
	venue: string;
	time: string;
	host: ObjectId;
}

export interface EventUpdateRequest {
	name?: string;
	venue?: string;
	time?: string;
	type?: ObjectId[];
	durationMinutes?: number;
	isEnded?: boolean;
	rating?: number;
	tags?: ObjectId[];
}

export interface EventCommentRequest {
	user: ObjectId;
	comment: string;
}
