import { Types } from "mongoose";

export type ObjectId = Types.ObjectId;

export interface ApiResponse<T> {
	msg: T;
}

export interface ErrorResponse {
	msg: string;
}

export * from "./user.ts";
export * from "./course.ts";
export * from "./studentType.ts";
export * from "./interest.ts";
export * from "./unit.ts";
export * from "./freeSlot.ts";
export * from "./event.ts";
export * from "./eventType.ts";
export * from "./tag.ts";
export * from "./populated.ts";
