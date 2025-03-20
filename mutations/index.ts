import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse, User, Event } from "../types/response";
import {
	CreateUserRequest,
	UpdateUserRequest,
	FollowUserRequest,
	UnfollowUserRequest,
	SignupRequest,
	LoginRequest,
	CourseRequest,
	UnitRequest,
	FreeSlotRequest,
	InterestRequest,
	StudentTypeRequest,
	CreateEventRequest,
	UpdateEventRequest,
	AddCommentRequest,
	JoinEventRequest,
	LeaveEventRequest,
	EventTypeRequest,
	TagRequest,
} from "../types/request";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Generic mutation function
const createMutation = async <T, R>({
	endpoint,
	data,
}: {
	endpoint: string;
	data: T;
}): Promise<ApiResponse<R>> => {
	const response = await axios.post(`${API_URL}${endpoint}`, data);
	return response.data;
};

const updateMutation = async <T, R>({
	endpoint,
	id,
	data,
}: {
	endpoint: string;
	id: string;
	data: T;
}): Promise<ApiResponse<R>> => {
	const response = await axios.put(`${API_URL}${endpoint}/${id}`, data);
	return response.data;
};

const deleteMutation = async <R>({
	endpoint,
	id,
}: {
	endpoint: string;
	id: string;
}): Promise<ApiResponse<R>> => {
	const response = await axios.delete(`${API_URL}${endpoint}/${id}`);
	return response.data;
};

// User mutations
export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<User>, Error, CreateUserRequest>({
		mutationFn: (data) =>
			createMutation<CreateUserRequest, User>({ endpoint: "/users", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<User>,
		Error,
		{ id: string; data: UpdateUserRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<UpdateUserRequest, User>({ endpoint: "/users", id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/users", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useFollowUser = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<void>,
		Error,
		{ id: string; followerId: string }
	>({
		mutationFn: ({ id, followerId }) =>
			createMutation<FollowUserRequest, void>({
				endpoint: `/users/${id}/follow`,
				data: { followerId },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUnfollowUser = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<void>,
		Error,
		{ id: string; followerId: string }
	>({
		mutationFn: ({ id, followerId }) =>
			createMutation<UnfollowUserRequest, void>({
				endpoint: `/users/${id}/unfollow`,
				data: { followerId },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useSignup = () => {
	return useMutation<ApiResponse<User>, Error, SignupRequest>({
		mutationFn: (data) =>
			createMutation<SignupRequest, User>({ endpoint: "/users/signup", data }),
	});
};

export const useLogin = () => {
	return useMutation<ApiResponse<User>, Error, LoginRequest>({
		mutationFn: (data) =>
			createMutation<LoginRequest, User>({ endpoint: "/users/login", data }),
	});
};

// Unit mutations
export const useCreateUnit = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<any>, Error, UnitRequest>({
		mutationFn: (data) =>
			createMutation<UnitRequest, any>({ endpoint: "/units", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["units"] });
		},
	});
};

export const useUpdateUnit = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<any>,
		Error,
		{ id: string; data: UnitRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<UnitRequest, any>({ endpoint: "/units", id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["units"] });
		},
	});
};

export const useDeleteUnit = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/units", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["units"] });
		},
	});
};

// Tag mutations
export const useCreateTag = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<string>, Error, TagRequest>({
		mutationFn: (data) =>
			createMutation<TagRequest, string>({ endpoint: "/tags", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};

export const useUpdateTag = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<string>,
		Error,
		{ id: string; data: TagRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<TagRequest, string>({ endpoint: "/tags", id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};

export const useDeleteTag = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/tags", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};

// Student type mutations
export const useCreateStudentType = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<string>, Error, StudentTypeRequest>({
		mutationFn: (data) =>
			createMutation<StudentTypeRequest, string>({
				endpoint: "/student-types",
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["studentTypes"] });
		},
	});
};

export const useUpdateStudentType = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<string>,
		Error,
		{ id: string; data: StudentTypeRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<StudentTypeRequest, string>({
				endpoint: "/student-types",
				id,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["studentTypes"] });
		},
	});
};

export const useDeleteStudentType = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) =>
			deleteMutation<void>({ endpoint: "/student-types", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["studentTypes"] });
		},
	});
};

// Interest mutations
export const useCreateInterest = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<any>, Error, InterestRequest>({
		mutationFn: (data) =>
			createMutation<InterestRequest, any>({ endpoint: "/interests", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["interests"] });
		},
	});
};

export const useUpdateInterest = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<any>,
		Error,
		{ id: string; data: InterestRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<InterestRequest, any>({
				endpoint: "/interests",
				id,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["interests"] });
		},
	});
};

export const useDeleteInterest = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/interests", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["interests"] });
		},
	});
};

// Free slot mutations
export const useCreateFreeSlot = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<any>, Error, FreeSlotRequest>({
		mutationFn: (data) =>
			createMutation<FreeSlotRequest, any>({ endpoint: "/free-slots", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["freeSlots"] });
		},
	});
};

export const useUpdateFreeSlot = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<any>,
		Error,
		{ id: string; data: FreeSlotRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<FreeSlotRequest, any>({
				endpoint: "/free-slots",
				id,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["freeSlots"] });
		},
	});
};

export const useDeleteFreeSlot = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/free-slots", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["freeSlots"] });
		},
	});
};

// Event mutations
export const useCreateEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<Event>, Error, CreateEventRequest>({
		mutationFn: (data) =>
			createMutation<CreateEventRequest, Event>({ endpoint: "/events", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});
};

export const useUpdateEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<Event>,
		Error,
		{ id: string; data: UpdateEventRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<UpdateEventRequest, Event>({
				endpoint: "/events",
				id,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});
};

export const useDeleteEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/events", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});
};

export const useAddCommentToEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<any>,
		Error,
		{ id: string; data: AddCommentRequest }
	>({
		mutationFn: ({ id, data }) =>
			createMutation<AddCommentRequest, any>({
				endpoint: `/events/${id}/comments`,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});
};

export const useJoinEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, { id: string; userId: string }>({
		mutationFn: ({ id, userId }) =>
			createMutation<JoinEventRequest, void>({
				endpoint: `/events/${id}/join`,
				data: { userId },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useLeaveEvent = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, { id: string; userId: string }>({
		mutationFn: ({ id, userId }) =>
			createMutation<LeaveEventRequest, void>({
				endpoint: `/events/${id}/leave`,
				data: { userId },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

// Event type mutations
export const useCreateEventType = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<string>, Error, EventTypeRequest>({
		mutationFn: (data) =>
			createMutation<EventTypeRequest, string>({
				endpoint: "/event-types",
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
		},
	});
};

export const useUpdateEventType = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<string>,
		Error,
		{ id: string; data: EventTypeRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<EventTypeRequest, string>({
				endpoint: "/event-types",
				id,
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
		},
	});
};

export const useDeleteEventType = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/event-types", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
		},
	});
};

// Course mutations
export const useCreateCourse = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<any>, Error, CourseRequest>({
		mutationFn: (data) =>
			createMutation<CourseRequest, any>({ endpoint: "/courses", data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
	});
};

export const useUpdateCourse = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<any>,
		Error,
		{ id: string; data: CourseRequest }
	>({
		mutationFn: ({ id, data }) =>
			updateMutation<CourseRequest, any>({ endpoint: "/courses", id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
	});
};

export const useDeleteCourse = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<void>, Error, string>({
		mutationFn: (id) => deleteMutation<void>({ endpoint: "/courses", id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
	});
};
