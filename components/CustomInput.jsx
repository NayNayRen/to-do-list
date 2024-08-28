import { Text, TextInput, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";

// passed prop addToDo function from index.jsx
const CustomInput = ({ value, handleChangeText, placeholder, title }) => {
	const [showPassword, setShowPassword] = useState(false);
	const clearInput = () => {
		console.log("cleared");
		handleChangeText("");
	};

	return (
		<View className="w-full mt-5 relative">
			<Text className="text-white text-lg mb-3">{title}</Text>
			<TextInput
				title={title}
				value={value}
				placeholder={placeholder}
				placeholderTextColor="#cdcdcd"
				className="text-white bg-black p-2 text-lg border border-b-white"
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
			{title === "To Do" && (
				<TouchableOpacity
					className="absolute right-2 bottom-3"
					onPress={() => {
						clearInput();
					}}
				>
					<Text className="text-white">Clear</Text>
					{/* <FontAwesome name="window-close" size={24} color="red" /> */}
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CustomInput;
// onChangeText is used for text inputs to capture what's being typed
