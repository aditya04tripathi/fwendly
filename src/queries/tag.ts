import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getTags = async () => {
	return useQuery({
		queryKey: ["tags"],
		queryFn: async () => {
			return axios.get("/api/tags");
		},
	});
};

export const getTagById = async (id: string) => {
	return useQuery({
		queryKey: ["tag", id],
		queryFn: async () => {
			return axios.get(`/api/tags/${id}`);
		},
	});
};
