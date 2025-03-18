import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, FreeSlot, PopulatedFreeSlot } from "../types";

export const getFreeSlots = async () => {
	return useQuery({
		queryKey: ["free-slots"],
		queryFn: async () => {
			return axios.get<ApiResponse<FreeSlot[]>>("/api/free-slots");
		},
	});
};

export const getFreeSlotById = async (id: string) => {
	return useQuery({
		queryKey: ["free-slot", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedFreeSlot>>(`/api/free-slots/${id}`);
		},
	});
};
