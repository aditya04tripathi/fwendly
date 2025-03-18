import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, Course, PopulatedCourse } from "../types";

export const getCourseById = async (id: string) => {
	return useQuery({
		queryKey: ["course", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedCourse>>(`/api/courses/${id}`);
		},
	});
};

export const getCourses = async () => {
	return useQuery({
		queryKey: ["courses"],
		queryFn: async () => {
			return axios.get<ApiResponse<Course[]>>("/api/courses");
		},
	});
};
