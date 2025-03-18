import { View, KeyboardAvoidingView, Text } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import React from "react";
import { Eye, EyeOff, Key, User2, Mail } from "lucide-react-native";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { useLoginMutation, useSignupMutation } from "@/mutations/user";

const RegisterScreen = () => {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(true);
	const userRegister = useSignupMutation();
	const userLogin = useLoginMutation();

	const handleRegister = async () => {
		try {
			await userRegister.mutateAsync({ name, email, password });
			await userLogin.mutateAsync({ email, password });

			if (userLogin.isSuccess) router.replace("/home");
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || "Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			className="flex items-center justify-center min-h-[75vh]"
		>
			<View className="mb-5 bg-black rounded-full size-56" />
			<Text className="text-2xl font-bold">Create Account 🚀</Text>

			<View className="flex-col w-full gap-2 mt-5">
				<CustomTextInput
					icon={<User2 color="white" />}
					placeholder="John Doe"
					value={name}
					onChangeText={setName}
				/>

				<CustomTextInput
					icon={<Mail color="white" />}
					placeholder="john@doe.com"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<CustomTextInput
					icon={<Key color="white" />}
					placeholder="************"
					value={password}
					onChangeText={setPassword}
					suffixIcon={
						!showPassword ? <Eye color="black" /> : <EyeOff color="black" />
					}
					suffixOnPress={() => setShowPassword((pv) => !pv)}
					hidden={showPassword}
				/>

				<View className="flex-row gap-2.5 items-center justify-between">
					<CustomButton
						className="flex-[0.5]"
						onPress={handleRegister}
						title="Sign Up"
						variant={"filled"}
						disabled={userRegister.isPending}
					/>
					<Link
						href="/"
						className="flex-[0.5] text-right text-blue-700 underline"
					>
						Already have an account? Login
					</Link>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;
