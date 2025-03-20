// User related types
export interface User {
	id: string;
	username: string;
	email: string;
	displayName: string;
	profilePicture?: string;
	bio?: string;
	course?: string;
	year?: number;
	faculty?: string;
	interests?: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface UserProfile extends User {
	followers: number;
	following: number;
	posts: number;
}

// Authentication types
export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupData extends LoginCredentials {
	username: string;
	displayName: string;
}

// Post related types
export interface Post {
	id: string;
	content: string;
	imageUrl?: string;
	author: User;
	likes: number;
	comments: number;
	createdAt: Date;
	updatedAt: Date;
	tags?: string[];
}

export interface Comment {
	id: string;
	content: string;
	author: User;
	postId: string;
	likes: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}

// Event types
export interface Event {
	id: string;
	title: string;
	description: string;
	location: string;
	startDate: Date;
	endDate: Date;
	organizer: User;
	attendees: User[];
	imageUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Message types
export interface Message {
	id: string;
	content: string;
	sender: User;
	receiver: User;
	read: boolean;
	createdAt: Date;
}

export interface Conversation {
	id: string;
	participants: User[];
	lastMessage: Message;
	unreadCount: number;
	updatedAt: Date;
}

// Notification types
export type NotificationType =
	| "like"
	| "comment"
	| "follow"
	| "mention"
	| "event";

export interface Notification {
	id: string;
	type: NotificationType;
	actor: User;
	target: string; // ID of the resource (post, comment, etc.)
	read: boolean;
	createdAt: Date;
}
