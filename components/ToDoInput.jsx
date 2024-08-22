import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Text, TextInput, View } from "react-native";

// passed prop addToDo function from index.jsx
const ToDoInput = ({ handleChangeText, placeholder, title }) => {
	return (
		<View>
			<Text className="text-white text-lg mb-3">{title}</Text>
			<TextInput
				placeholder={placeholder}
				className="bg-white p-2 text-lg"
				onChangeText={handleChangeText}
			/>
		</View>
	);
};

export default ToDoInput;
// onChangeText is used for text inputs to capture what's being typed
