import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ApiResponse, Unit, PopulatedUnit } from "../types";

export const getUnits = async () => {
	return useQuery({
		queryKey: ["units"],
		queryFn: async () => {
			return axios.get<ApiResponse<Unit[]>>("/api/units");
		},
	});
};

export const getUnitById = async (id: string) => {
	return useQuery({
		queryKey: ["unit", id],
		queryFn: async () => {
			return axios.get<ApiResponse<PopulatedUnit>>(`/api/units/${id}`);
		},
	});
};
