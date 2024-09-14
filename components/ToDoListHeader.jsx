import { Alert, View, StyleSheet } from "react-native";
import { createToDo } from "../db/appwrite";
import Avatar from "./Avatar";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Header from "./Header";
import React, { useState } from "react";
import uuid from "react-native-uuid";

const ToDoListHeader = ({
	refetch,
	user,
	setSpinnerVisible,
	setSpinnerText,
}) => {
	const [inputText, setInputText] = useState("");
	const [toDos, setToDos] = useState([]);

	// updates the input text, also used to clear it
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// add to do
	const addToDo = async (inputText) => {
		if (!inputText) {
			Alert.alert(
				"Error",
				"You need something in the text to add to your To Dos..."
			);
		} else {
			let newId = uuid.v4();
			setSpinnerVisible(true);
			setSpinnerText("Adding To Do...");
			await createToDo(newId, inputText);
			setToDos((previousList) => {
				addTypedInput("");
				return [{ id: newId, text: inputText }, ...previousList];
			});
			await refetch();
			setSpinnerVisible(false);
		}
	};

	return (
		<View className="w-full mb-5">
			<Header title="A List of To Dos" />
			<View className="rounded-full justify-center items-center w-full">
				<Avatar avatar={user?.avatar} />
			</View>
			<CustomInput
				title="Create To Do"
				titleStyles="text-white"
				value={inputText}
				handleChangeText={addTypedInput}
				placeholder="What would you like to add?"
				placeholderTextColor="#cdcdcd"
				extraStyles="text-white bg-black border border-b-white"
			/>
			<CustomButton
				handlePressAction={addToDo}
				inputText={inputText}
				title="Add To Do"
				extraStyles="bg-[#00aeef]"
			/>
		</View>
	);
};

export default ToDoListHeader;

const styles = StyleSheet.create({
	spinnerText: {
		color: "#fff",
	},
});
