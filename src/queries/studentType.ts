import { useQuery } from "@tanstack/react-query";
import axios from ".";
import { ApiResponse, StudentType } from "../types";

export const getStudentTypes = async () => {
	return useQuery({
		queryKey: ["student-types"],
		queryFn: async () => {
			return axios.get<ApiResponse<StudentType[]>>("/api/student-types");
		},
	});
};

export const getStudentTypeById = async (id: string) => {
	return useQuery({
		queryKey: ["student-type", id],
		queryFn: async () => {
			return axios.get<ApiResponse<StudentType>>(`/api/student-types/${id}`);
		},
	});
};
