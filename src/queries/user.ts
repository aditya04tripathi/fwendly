import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, User, PopulatedUser } from "../types";

export const getUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			return axios.get<ApiResponse<User[]>>("/api/users");
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
