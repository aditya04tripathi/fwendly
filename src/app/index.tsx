import { View, KeyboardAvoidingView, Text } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import React from "react";
import { Eye, EyeOff, Key, User2 } from "lucide-react-native";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useLoginMutation } from "@/mutations/user";

const LoginScreen = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(true);
	const userLogin = useLoginMutation();

	const handleLogin = async () => {
		try {
			await userLogin.mutateAsync({ email, password });

			if (userLogin.isSuccess) router.push("/home");

			if (userLogin.isError)
				throw new Error("An error occurred while fetching user data");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			className="flex items-center justify-center min-h-[75vh]"
		>
			<View className="mb-5 bg-black rounded-full size-56" />
			<Text className="text-2xl font-bold">Welcome back 🚀</Text>

			<View className="flex-col w-full gap-2 mt-5">
				<CustomTextInput
					icon={<User2 color="white" />}
					placeholder="john@doe.com"
					value={email}
					onChangeText={setEmail}
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
						onPress={handleLogin}
						title="Login"
						variant={"filled"}
					/>
					<Link
						href="/register"
						className="flex-[0.5] text-right text-blue-700 underline"
					>
						No account? Sign up!
					</Link>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;
