import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, Tag, PopulatedTag } from "../types";

export const getTags = async () => {
	return useQuery({
		queryKey: ["tags"],
		queryFn: async () => {
			return axios.get<ApiResponse<Tag[]>>("/api/tags");
		},
	});
};

export const getTagById = async (id: string) => {
	return useQuery({
		queryKey: ["tag", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedTag>>(`/api/tags/${id}`);
		},
	});
};
