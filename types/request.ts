// User related request types
export interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserRequest {
	name?: string;
	email?: string;
	course?: string;
	startYear?: number;
	endYear?: number;
	studentType?: string[];
	interests?: string[];
	units?: string[];
	freeSlots?: string[];
}

export interface FollowUserRequest {
	followerId: string;
}

export interface UnfollowUserRequest {
	followerId: string;
}

export interface SignupRequest {
	name: string;
	email: string;
	password: string;
	course?: string;
	startYear?: number;
	endYear?: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}

// Course related request types
export interface CourseRequest {
	name: string;
	code: string;
}

// Unit related request types
export interface UnitRequest {
	name: string;
	code: string;
}

// Free Slot related request types
export interface FreeSlotRequest {
	name: string;
	code: string;
}

// Interest related request types
export interface InterestRequest {
	name: string;
}

// Student Type related request types
export interface StudentTypeRequest {
	name: "Domestic" | "International" | "Transfer" | "Exchange";
}

// Event related request types
export interface CreateEventRequest {
	name: string;
	venue: string;
	time: Date;
	host: string;
	type?: string;
	durationMinutes?: number;
	tags?: string[];
}

export interface UpdateEventRequest {
	name?: string;
	venue?: string;
	time?: Date;
	type?: string;
	durationMinutes?: number;
	isEnded?: boolean;
	rating?: number;
	tags?: string[];
}

export interface AddCommentRequest {
	user: string;
	comment: string;
}

export interface JoinEventRequest {
	userId: string;
}

export interface LeaveEventRequest {
	userId: string;
}

// Event Type related request types
export interface EventTypeRequest {
	name: string;
}

// Tag related request types
export interface TagRequest {
	name: string;
}

// Pagination request types
export interface PaginationRequest {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

// Search request types
export interface SearchRequest {
	query: string;
	filters?: {
		[key: string]: any;
	};
}

// Filter request types
export interface FilterUsersRequest extends PaginationRequest {
	course?: string;
	studentType?: string[];
	interests?: string[];
	units?: string[];
}

export interface FilterEventsRequest extends PaginationRequest {
	host?: string;
	type?: string;
	tags?: string[];
	fromDate?: Date;
	toDate?: Date;
	isEnded?: boolean;
}
