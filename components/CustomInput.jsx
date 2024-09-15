import { Text, TextInput, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useRef, useState } from "react";

// passed prop addToDo function from index.jsx
const CustomInput = ({
	value,
	handleChangeText,
	placeholder,
	placeholderTextColor,
	title,
	extraStyles,
	titleStyles,
	focusedInput,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputRef = useRef();
	const clearInput = () => {
		handleChangeText("");
	};
	// has to be delayed to show the keyboard on focus
	useEffect(() => {
		if (focusedInput == true) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 500);
		}
	});

	return (
		<View className="w-full mt-5 relative">
			<Text className={`text-xl mb-2 font-bold ${titleStyles}`}>{title}</Text>
			<TextInput
				title={title}
				value={value}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				className={`p-2 text-lg ${extraStyles}`}
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password" && !showPassword}
				multiline={title === "Edit To Do" ? true : false}
				// autoFocus={focusedInput}
				ref={inputRef}
			/>
			{title === "Password" && (
				<TouchableOpacity
					className="absolute right-4 bottom-4"
					onPress={() => setShowPassword(!showPassword)}
				>
					<FontAwesome
						name={!showPassword ? "eye" : "eye-slash"}
						size={24}
						color={titleStyles === "text-white" ? "#fff" : "#000"}
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
