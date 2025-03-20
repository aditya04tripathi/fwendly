import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse, User, UserProfile, Event, Post, Comment } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Generic query function
const fetchData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
	const response = await axios.get(`${API_URL}${endpoint}`);
	return response.data;
};

const fetchById = async <T>({
	endpoint,
	id,
}: {
	endpoint: string;
	id: string;
}): Promise<ApiResponse<T>> => {
	const response = await axios.get(`${API_URL}${endpoint}/${id}`);
	return response.data;
};

// User queries
export const useGetUsers = () => {
	return useQuery<ApiResponse<User[]>, Error>({
		queryKey: ["users"],
		queryFn: () => fetchData<User[]>("/users"),
	});
};

export const useGetUser = (id: string) => {
	return useQuery<ApiResponse<UserProfile>, Error>({
		queryKey: ["users", id],
		queryFn: () => fetchById<UserProfile>({ endpoint: "/users", id }),
		enabled: !!id,
	});
};

export const useGetCurrentUser = (userId: string) => {
	return useQuery<ApiResponse<User>, Error>({
		queryKey: ["currentUser"],
		queryFn: () => fetchData<User>(`/users/me?userId=${userId}`),
		enabled: !!userId,
	});
};

// Unit queries
export const useGetUnits = () => {
	return useQuery<ApiResponse<any[]>, Error>({
		queryKey: ["units"],
		queryFn: () => fetchData<any[]>("/units"),
	});
};

export const useGetUnit = (id: string) => {
	return useQuery<ApiResponse<any>, Error>({
		queryKey: ["units", id],
		queryFn: () => fetchById<any>({ endpoint: "/units", id }),
		enabled: !!id,
	});
};

// Tag queries
export const useGetTags = () => {
	return useQuery<ApiResponse<string[]>, Error>({
		queryKey: ["tags"],
		queryFn: () => fetchData<string[]>("/tags"),
	});
};

export const useGetTag = (id: string) => {
	return useQuery<ApiResponse<string>, Error>({
		queryKey: ["tags", id],
		queryFn: () => fetchById<string>({ endpoint: "/tags", id }),
		enabled: !!id,
	});
};

// Student type queries
export const useGetStudentTypes = () => {
	return useQuery<ApiResponse<string[]>, Error>({
		queryKey: ["studentTypes"],
		queryFn: () => fetchData<string[]>("/student-types"),
	});
};

export const useGetStudentType = (id: string) => {
	return useQuery<ApiResponse<string>, Error>({
		queryKey: ["studentTypes", id],
		queryFn: () => fetchById<string>({ endpoint: "/student-types", id }),
		enabled: !!id,
	});
};

// Interest queries
export const useGetInterests = () => {
	return useQuery<ApiResponse<string[]>, Error>({
		queryKey: ["interests"],
		queryFn: () => fetchData<string[]>("/interests"),
	});
};

export const useGetInterest = (id: string) => {
	return useQuery<ApiResponse<string>, Error>({
		queryKey: ["interests", id],
		queryFn: () => fetchById<string>({ endpoint: "/interests", id }),
		enabled: !!id,
	});
};

// Free slot queries
export const useGetFreeSlots = () => {
	return useQuery<ApiResponse<any[]>, Error>({
		queryKey: ["freeSlots"],
		queryFn: () => fetchData<any[]>("/free-slots"),
	});
};

export const useGetFreeSlot = (id: string) => {
	return useQuery<ApiResponse<any>, Error>({
		queryKey: ["freeSlots", id],
		queryFn: () => fetchById<any>({ endpoint: "/free-slots", id }),
		enabled: !!id,
	});
};

// Event queries
export const useGetEvents = () => {
	return useQuery<ApiResponse<Event[]>, Error>({
		queryKey: ["events"],
		queryFn: () => fetchData<Event[]>("/events"),
	});
};

export const useGetEvent = (id: string) => {
	return useQuery<ApiResponse<Event>, Error>({
		queryKey: ["events", id],
		queryFn: () => fetchById<Event>({ endpoint: "/events", id }),
		enabled: !!id,
	});
};

// Event type queries
export const useGetEventTypes = () => {
	return useQuery<ApiResponse<string[]>, Error>({
		queryKey: ["eventTypes"],
		queryFn: () => fetchData<string[]>("/event-types"),
	});
};

export const useGetEventType = (id: string) => {
	return useQuery<ApiResponse<string>, Error>({
		queryKey: ["eventTypes", id],
		queryFn: () => fetchById<string>({ endpoint: "/event-types", id }),
		enabled: !!id,
	});
};

// Course queries
export const useGetCourses = () => {
	return useQuery<ApiResponse<any[]>, Error>({
		queryKey: ["courses"],
		queryFn: () => fetchData<any[]>("/courses"),
	});
};

export const useGetCourse = (id: string) => {
	return useQuery<ApiResponse<any>, Error>({
		queryKey: ["courses", id],
		queryFn: () => fetchById<any>({ endpoint: "/courses", id }),
		enabled: !!id,
	});
};
