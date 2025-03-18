import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getInterests = async () => {
	return useQuery({
		queryKey: ["interests"],
		queryFn: async () => {
			return axios.get("/api/interests");
		},
	});
};

export const getInterestById = async (id: string) => {
	return useQuery({
		queryKey: ["interest", id],
		queryFn: async () => {
			return axios.get(`/api/interests/${id}`);
		},
	});
};
