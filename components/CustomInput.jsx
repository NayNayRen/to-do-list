import { Text, TextInput, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";

// passed prop addToDo function from index.jsx
const CustomInput = ({
	value,
	handleChangeText,
	placeholder,
	title,
	extraStyles,
	titleStyles,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const clearInput = () => {
		handleChangeText("");
	};

	return (
		<View className="w-full mt-5 relative">
			<Text className={`text-xl mb-2 ${titleStyles}`}>{title}</Text>
			<TextInput
				title={title}
				value={value}
				placeholder={placeholder}
				placeholderTextColor="#cdcdcd"
				className={`p-2 text-lg ${extraStyles}`}
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password" && !showPassword}
			/>
			{title === "Password" && (
				<TouchableOpacity
					className="absolute right-4 bottom-3"
					onPress={() => setShowPassword(!showPassword)}
				>
					<FontAwesome
						name={!showPassword ? "eye" : "eye-slash"}
						size={24}
						color="#fff"
					/>
				</TouchableOpacity>
			)}
			{title === "Create To Do" && (
				<TouchableOpacity
					className="absolute right-0 top-0 bg-white px-5 py-1 rounded-lg"
					onPress={() => {
						clearInput();
					}}
				>
					<Text className="text-black">Clear</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CustomInput;
// onChangeText is used for text inputs to capture what's being typed
