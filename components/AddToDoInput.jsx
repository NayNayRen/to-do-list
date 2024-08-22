import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

// passed prop addToDo function from index.jsx
const AddToDoInput = ({ addToDo }) => {
	// state to deal with the input value
	const [inputText, setInputText] = useState("");
	const addTypedInput = (inputTextValue) => setInputText(inputTextValue);

	return (
		<>
			<TextInput
				placeholder="What would you like to add?"
				className="bg-white p-2 text-lg"
				onChangeText={addTypedInput}
			/>
			<TouchableOpacity
				style={styles.button}
				className="my-10"
				onPress={() => addToDo(inputText)}
			>
				<Text style={styles.buttonText}>Add To Do</Text>
			</TouchableOpacity>
		</>
	);
};

export default AddToDoInput;
// onChangeText is used for text inputs to capture what's being typed

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: "#00aeef",
		borderRadius: 10,
		height: 50,
		justifyContent: "center",
		padding: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
});
