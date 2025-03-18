import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getFreeSlots = async () => {
	return useQuery({
		queryKey: ["free-slots"],
		queryFn: async () => {
			return axios.get("/api/free-slots");
		},
	});
};

export const getFreeSlotById = async (id: string) => {
	return useQuery({
		queryKey: ["free-slot", id],
		queryFn: async () => {
			return axios.get(`/api/free-slots/${id}`);
		},
	});
};
