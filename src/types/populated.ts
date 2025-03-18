import { User } from "./user.js";
import { Course } from "./course.js";
import { StudentType } from "./studentType.js";
import { Interest } from "./interest.js";
import { Unit } from "./unit.js";
import { FreeSlot } from "./freeSlot.js";
import { Event } from "./event.js";
import { EventType } from "./eventType.js";
import { Tag } from "./tag.js";

// These types represent the data after mongoose populate operations
export interface PopulatedUser
	extends Omit<
		User,
		| "course"
		| "studentType"
		| "interests"
		| "units"
		| "freeSlots"
		| "eventsHosted"
		| "eventsAttended"
		| "followers"
		| "following"
	> {
	course?: Course;
	studentType: StudentType[];
	interests: Interest[];
	units: Unit[];
	freeSlots: FreeSlot[];
	eventsHosted: Event[];
	eventsAttended: Event[];
	followers: User[];
	following: User[];
}

export interface PopulatedEvent
	extends Omit<Event, "host" | "attendees" | "type" | "tags" | "comments"> {
	host: User;
	attendees: User[];
	type: EventType[];
	tags: Tag[];
	comments: Array<{
		user: User;
		comment: string;
	}>;
}

export interface PopulatedEventType extends Omit<EventType, "events"> {
	events: Event[];
}

export interface PopulatedTag extends Omit<Tag, "events"> {
	events: Event[];
}

export interface PopulatedInterest extends Omit<Interest, "people" | "events"> {
	people: User[];
	events: Event[];
}

export interface PopulatedUnit extends Omit<Unit, "people"> {
	people: User[];
}

export interface PopulatedFreeSlot extends Omit<FreeSlot, "people"> {
	people: User[];
}

export interface PopulatedStudentType extends Omit<StudentType, "people"> {
	people: User[];
}

export interface PopulatedCourse extends Omit<Course, "people"> {
	people: User[];
}
