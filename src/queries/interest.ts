import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, Interest, PopulatedInterest } from "../types";

export const getInterests = async () => {
	return useQuery({
		queryKey: ["interests"],
		queryFn: async () => {
			return axios.get<ApiResponse<Interest[]>>("/api/interests");
		},
	});
};

export const getInterestById = async (id: string) => {
	return useQuery({
		queryKey: ["interest", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedInterest>>(`/api/interests/${id}`);
		},
	});
};
