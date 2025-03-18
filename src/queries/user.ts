import { useQuery } from "@tanstack/react-query";
import axios from ".";
import { ApiResponse, User, PopulatedUser } from "../types";

export const getUsers = async () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			return axios.get<ApiResponse<User[]>>("/api/users");
		},
	});
};

export const getUserById = async (id: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedUser>>(`/api/users/${id}`);
		},
	});
};

export const getCurrentUser = async () => {
	return useQuery({
		queryKey: ["current-user"],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedUser>>("/api/users/me");
		},
	});
};
