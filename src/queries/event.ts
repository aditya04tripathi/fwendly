import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getEvents = async () => {
	return useQuery({
		queryKey: ["events"],
		queryFn: async () => {
			return axios.get("/api/events");
		},
	});
};

export const getEventById = async (id: string) => {
	return useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			return axios.get(`/api/events/${id}`);
		},
	});
};
