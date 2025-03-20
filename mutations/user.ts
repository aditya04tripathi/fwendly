import { MinusIcon } from "lucide-react";
import { axiosInstance } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse, LoginRequest, SignupRequest, User } from "@/types";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: LoginRequest) => {
			return axiosInstance.post<ApiResponse<User | null>>("/users/login", data);
		},
	});
};

export const useRegisterMutation = () => {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (data: SignupRequest) => {
			return axiosInstance.post<ApiResponse<User | null>>(
				"/users/signup",
				data
			);
		},
	});
};
