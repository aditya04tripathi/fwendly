import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getUsers = async () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			return axios.get("/api/users");
		},
	});
};

export const getUserById = async (id: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: async () => {
			return axios.get(`/api/users/${id}`);
		},
	});
};
