import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getCourseById = async (id: string) => {
	return useQuery({
		queryKey: ["course", id],
		queryFn: async () => {
			return axios.get(`/api/courses/${id}`);
		},
	});
};

export const getCourses = async () => {
	return useQuery({
		queryKey: ["courses"],
		queryFn: async () => {
			return axios.get("/api/courses");
		},
	});
};
