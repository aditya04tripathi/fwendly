import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, Event, PopulatedEvent } from "../types";

export const getEvents = async () => {
	return useQuery({
		queryKey: ["events"],
		queryFn: async () => {
			return axios.get<ApiResponse<Event[]>>("/api/events");
		},
	});
};

export const getEventById = async (id: string) => {
	return useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedEvent>>(`/api/events/${id}`);
		},
	});
};
