import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, EventType, PopulatedEventType } from "../types";

export const getEventTypes = async () => {
	return useQuery({
		queryKey: ["event-types"],
		queryFn: async () => {
			return axios.get<ApiResponse<EventType[]>>("/api/event-types");
		},
	});
};

export const getEventTypeById = async (id: string) => {
	return useQuery({
		queryKey: ["event-type", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedEventType>>(
				`/api/event-types/${id}`
			);
		},
	});
};
