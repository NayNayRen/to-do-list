import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

const CustomButton = ({ handlePressAction, inputText, title, extraStyles }) => {
	// const [inputText, setInputText] = useState("");
	return (
		<View>
			<TouchableOpacity
				style={styles.button}
				className={`my-10 px-10 ${extraStyles}`}
				onPress={() => handlePressAction(inputText)}
			>
				<Text style={styles.buttonText}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: 10,
		height: 50,
		justifyContent: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
});
