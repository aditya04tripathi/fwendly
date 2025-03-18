import React from "react";
import {
	View,
	TextInput,
	Text,
	ViewStyle,
	TextStyle,
	TouchableOpacity,
} from "react-native";

interface CustomTextInputProps {
	placeholder?: string;
	value: string;
	onChangeText?: (text: string) => void;
	icon: React.ReactNode;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	iconContainerStyle?: ViewStyle;
	placeholderTextColor?: string;
	suffixIcon?: React.ReactNode;
	suffixOnPress?: () => void;
	hidden?: boolean;
	keyboardType?:
		| "default"
		| "number-pad"
		| "decimal-pad"
		| "numeric"
		| "email-address"
		| "phone-pad";
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
	placeholder = "",
	value,
	onChangeText,
	icon,
	containerStyle,
	inputStyle,
	iconContainerStyle,
	placeholderTextColor = "#00000050",
	suffixIcon,
	suffixOnPress,
	hidden = false,
	keyboardType = "default",
}) => {
	return (
		<View
			className={`relative w-full h-16 p-0 border-b-2 ${"rounded-l-full"}`}
			style={containerStyle}
		>
			<View
				className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-16 h-16 bg-black rounded-full"
				style={iconContainerStyle}
			>
				{icon}
			</View>

			<TextInput
				keyboardAppearance="dark"
				keyboardType={keyboardType}
				secureTextEntry={hidden}
				placeholderTextColor={placeholderTextColor}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				className="w-full h-16 py-0 pr-2.5 pl-20 bg-transparent border-none"
				style={inputStyle}
			/>

			{suffixIcon && (
				<TouchableOpacity
					className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-16 h-16 rounded-full"
					onPress={suffixOnPress}
				>
					{suffixIcon}
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CustomTextInput;
