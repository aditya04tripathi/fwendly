import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getEventTypes = async () => {
	return useQuery({
		queryKey: ["event-types"],
		queryFn: async () => {
			return axios.get("/api/event-types");
		},
	});
};

export const getEventTypeById = async (id: string) => {
	return useQuery({
		queryKey: ["event-type", id],
		queryFn: async () => {
			return axios.get(`/api/event-types/${id}`);
		},
	});
};
