"use client";

import { useRegisterMutation } from "@/mutations";
import { SignupRequest } from "@/types";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
	const registerMutation = useRegisterMutation();
	const [form, setForm] = useState<SignupRequest>({
		email: "",
		password: "",
		name: "",
		course: "",
		endYear: 0,
		startYear: 0,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);

		registerMutation.mutate({
			email: form.email,
			password: form.password,
			name: form.name,
			course: form.course,
			startYear: form.startYear,
			endYear: form.endYear,
		});
	};

	useEffect(() => {
		switch (registerMutation.status) {
			case "success":
				console.log("Registered successfully");
				console.log(registerMutation.data.data);
				break;
			case "error":
				console.log("Error registering");
				break;
			case "pending":
				console.log("Registering...");
				break;
		}
	}, [registerMutation.status]);

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="text"
				placeholder="Email"
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<Input
				type="password"
				placeholder="Password"
				value={form.password}
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			<Input
				type="text"
				placeholder="Name"
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>
			<Input
				type="text"
				placeholder="Course"
				value={form.course}
				onChange={(e) => setForm({ ...form, course: e.target.value })}
			/>
			<Input
				type="number"
				placeholder="Start Year"
				value={form.startYear}
				onChange={(e) =>
					setForm({ ...form, startYear: parseInt(e.target.value) })
				}
			/>
			<Input
				type="number"
				placeholder="End Year"
				value={form.endYear}
				onChange={(e) =>
					setForm({ ...form, endYear: parseInt(e.target.value) })
				}
			/>
			<Button type="submit">Register</Button>
		</form>
	);
};

export default RegisterForm;
