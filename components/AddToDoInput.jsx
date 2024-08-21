import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";

// passed prop addItem function from index.jsx
const AddToDoInput = ({ addToDo }) => {
	// state to deal with the input value
	const [inputText, setInputText] = useState("");
	const addTypedInput = (inputTextValue) => setInputText(inputTextValue);

	return (
		<View>
			<TextInput
				placeholder="What would you like to add?"
				className="bg-white p-2 mb-5"
				onChangeText={addTypedInput}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => addToDo(inputText)}
			>
				<Text style={styles.buttonText}>
					Add <FontAwesome name="plus" size={20} />
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddToDoInput;
// onChangeText is used for text inputs to capture what's being typed

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: "#006d97",
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
