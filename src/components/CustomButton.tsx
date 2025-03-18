import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	variant?: "filled" | "outlined";
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
	className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	variant = "filled",
	containerStyle,
	textStyle,
	disabled = false,
	className,
}) => {
	const getContainerStyle = () => {
		return variant === "filled"
			? "items-center justify-center flex-1 h-16 bg-black rounded-full"
			: "items-center justify-center flex-1 h-16 bg-transparent border-2 border-black rounded-full";
	};

	const getTextStyle = () => {
		return variant === "filled" ? "text-white" : "text-black";
	};

	return (
		<TouchableOpacity
			className={`h-16 ${getContainerStyle()} ${
				disabled ? "opacity-50" : ""
			} ${className}`}
			onPress={onPress}
			disabled={disabled}
			style={containerStyle}
		>
			<Text className={getTextStyle()} style={textStyle}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
