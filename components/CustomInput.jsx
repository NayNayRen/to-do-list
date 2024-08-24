import { Text, TextInput, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";

// passed prop addToDo function from index.jsx
const CustomInput = ({ handleChangeText, placeholder, title }) => {
	const [showPassword, setshowPassword] = useState(false);

	return (
		<View className="w-full mt-5 relative">
			<Text className="text-white text-lg mb-3">{title}</Text>
			<TextInput
				title={title}
				placeholder={placeholder}
				className="bg-white p-2 text-lg"
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password" && !showPassword}
			/>
			{title === "Password" && (
				<TouchableOpacity
					className="absolute right-4 bottom-2"
					onPress={() => setshowPassword(!showPassword)}
				>
					<FontAwesome
						name={!showPassword ? "eye" : "eye-slash"}
						size={24}
						color="#000"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CustomInput;
// onChangeText is used for text inputs to capture what's being typed
