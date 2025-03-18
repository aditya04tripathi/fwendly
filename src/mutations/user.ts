import { useMutation } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, PopulatedUser, User } from "../types";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupData extends LoginCredentials {
	name: string;
	course?: string;
	startYear?: number;
	endYear?: number;
}

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["user", "login"],
		mutationFn: async ({ email, password }: LoginCredentials) => {
			return axios.post<ApiResponse<User>>("/api/users/login", {
				email,
				password,
			});
		},
	});
};

export const useSignupMutation = () => {
	return useMutation({
		mutationKey: ["user", "signup"],
		mutationFn: async (userData: SignupData) => {
			return axios.post<ApiResponse<User>>("/api/users/signup", userData);
		},
	});
};

export const getUserById = () => {
	return useMutation({
		mutationKey: ["user", "get"],
		mutationFn: async (id: string) => {
			return axios.get<ApiResponse<PopulatedUser>>(`/api/users/${id}`);
		},
	});
};

export const updateUserMutation = () => {
	return useMutation({
		mutationKey: ["user", "update"],
		mutationFn: async ({
			id,
			userData,
		}: {
			id: string;
			userData: Partial<User>;
		}) => {
			return axios.put<ApiResponse<User>>(`/api/users/${id}`, userData);
		},
	});
};

export const getCurrentUserMutation = () => {
	return useMutation({
		mutationKey: ["user", "current"],
		mutationFn: async (userId: string) => {
			return axios.get<User>(`/api/users/me?userId=${userId}`);
		},
	});
};
