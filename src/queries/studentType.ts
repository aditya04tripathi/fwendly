import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getStudentTypes = async () => {
	return useQuery({
		queryKey: ["student-types"],
		queryFn: async () => {
			return axios.get("/api/student-types");
		},
	});
};

export const getStudentTypeById = async (id: string) => {
	return useQuery({
		queryKey: ["student-type", id],
		queryFn: async () => {
			return axios.get(`/api/student-types/${id}`);
		},
	});
};
