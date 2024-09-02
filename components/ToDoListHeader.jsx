import { Alert, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { createToDo } from "../db/appwrite";
import uuid from "react-native-uuid";
import Avatar from "./Avatar";
import Header from "./Header";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useAppwrite from "../db/useAppwrite";
import { getCurrentUser, signOut } from "../db/appwrite";

const ToDoListHeader = ({ refetch }) => {
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const [inputText, setInputText] = useState("");
	const [toDos, setToDos] = useState([]);

	// updates the input text, also used to clear it
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
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
			await createToDo(newId, inputText);
			setToDos((previousList) => {
				return [{ id: newId, text: inputText }, ...previousList];
			});
			addTypedInput("");
			onRefresh();
		}
	};

	// logs user out
	const logOut = async () => {
		await signOut();
	};

	return (
		<View className="w-full">
			<Header title="Your List of To Dos" />
			<View className="justify-center items-end w-full">
				<TouchableOpacity onPress={() => logOut()}>
					<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
				</TouchableOpacity>
			</View>
			<View className="rounded-full justify-center items-center w-full">
				<Avatar user={currentUserData} />
			</View>
			<CustomInput
				title="To Do"
				titleStyles="text-white"
				value={inputText}
				handleChangeText={addTypedInput}
				placeholder="What would you like to add?"
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
