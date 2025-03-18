import { useQuery } from "@tanstack/react-query";
import axios from ".";

export const getUnits = async () => {
	return useQuery({
		queryKey: ["units"],
		queryFn: async () => {
			return axios.get("/api/units");
		},
	});
};

export const getUnitById = async (id: string) => {
	return useQuery({
		queryKey: ["unit", id],
		queryFn: async () => {
			return axios.get(`/api/units/${id}`);
		},
	});
};
