import { getDateTime } from "../js/helperFunctions";
import { updateToDo, getSingleToDo, deleteToDo } from "../db/appwrite";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState, useRef } from "react";

// passed props of item and functions from index.jsx
export default function ToDoItem({
	refetch,
	itemId,
	itemBody,
	itemCreated,
	itemUpdated,
	itemDeleteId,
	setSpinnerVisible,
	setSpinnerText,
}) {
	const createdDateTime = getDateTime(itemCreated, false);
	const updatedDateTime = getDateTime(itemUpdated, false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [inputText, setInputText] = useState(itemBody);
	const [toDos, setToDos] = useState([]);
	const [focusedInput, setFocusedInput] = useState(false);
	// updates the input text
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// gets the todo body for the update modal
	const getToDoForModal = async () => {
		setEditModalVisible(true);
		addTypedInput(itemBody);
		setFocusedInput(true);
	};

	// delete to do
	const removeToDo = async (id) => {
		setSpinnerVisible(true);
		setSpinnerText("Removing To Do...");
		setDeleteModalVisible(false);
		await deleteToDo(id);
		setToDos((previousList) => {
			// filtering todo, bring back todos that don't match the id passed as a prop
			return previousList.filter((toDo) => toDo.id != id);
		});
		await refetch();
		setSpinnerVisible(false);
	};

	// updates the todo body via modal button
	const update = async () => {
		setSpinnerVisible(true);
		setSpinnerText("Updating To Do...");
		setEditModalVisible(false);
		await updateToDo(itemId, inputText);
		await refetch();
		setSpinnerVisible(false);
	};

	return (
		<View className="w-full">
			{/* to do container */}
			<View style={styles.toDoContainer} className="w-full">
				<View className="w-[90%]">
					<Text style={styles.toDoText}>{itemBody}</Text>
					<Text style={styles.toDoDateAdded}>
						<Text className="text-black">Created:</Text>{" "}
						{createdDateTime.weekdayShort} {createdDateTime.monthNameShort}{" "}
						{createdDateTime.day} - {createdDateTime.time12}
					</Text>
					<Text style={styles.toDoDateAdded}>
						<Text className="text-black">Updated:</Text>{" "}
						{updatedDateTime.weekdayShort} {updatedDateTime.monthNameShort}{" "}
						{updatedDateTime.day} - {updatedDateTime.time12}
					</Text>
				</View>
				{/* edit button */}
				<View style={styles.toDoButtonContainer}>
					<TouchableOpacity
						className="w-[35px] m-2"
						onPress={() => setDeleteModalVisible(true)}
					>
						<FontAwesome name="minus-square" size={24} color="red" />
					</TouchableOpacity>
					<TouchableOpacity className="w-[35px] m-2" onPress={getToDoForModal}>
						<FontAwesome name="edit" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
			{/* delete modal */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={deleteModalVisible}
				onRequestClose={() => {
					setDeleteModalVisible(false);
				}}
			>
				<View style={styles.modalFullContainer}>
					<View style={styles.modalCenterContainer}>
						<TouchableOpacity
							style={styles.modalCloseButton}
							onPress={() => setDeleteModalVisible(false)}
						>
							<FontAwesome name="window-close" size={24} color="#ff0000" />
						</TouchableOpacity>
						<View className="w-full">
							<Text className="text-xl mb-2 mt-5 font-bold">
								Delete This To Do?
							</Text>
							<Text className="p-2 text-lg">{itemBody}</Text>
							<Text style={styles.toDoDateAdded} className="pl-2">
								<Text className="text-black">Created:</Text>{" "}
								{createdDateTime.weekdayShort} {createdDateTime.monthNameShort}{" "}
								{createdDateTime.day} - {createdDateTime.time12}
							</Text>
						</View>
						<CustomButton
							title="Delete To Do"
							extraStyles="bg-[#ff0000]"
							inputText={itemDeleteId}
							handlePressAction={removeToDo}
						/>
					</View>
				</View>
			</Modal>
			{/* update modal */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={editModalVisible}
				onRequestClose={() => {
					setEditModalVisible(false);
				}}
			>
				<View style={styles.modalFullContainer}>
					<View style={styles.modalCenterContainer}>
						<TouchableOpacity
							style={styles.modalCloseButton}
							onPress={() => setEditModalVisible(false)}
						>
							<FontAwesome name="window-close" size={24} color="#ff0000" />
						</TouchableOpacity>
						<CustomInput
							title="Edit To Do"
							titleStyles="text-black"
							value={inputText}
							handleChangeText={addTypedInput}
							placeholder="Can't update something that's not there..."
							placeholderTextColor="#808080"
							extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
							focusedInput={focusedInput}
						/>
						<CustomButton
							title="Update To Do"
							extraStyles="bg-[#00aeef]"
							handlePressAction={update}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	toDoButtonContainer: {
		borderColor: "#808080",
		borderLeftWidth: 1,
		marginLeft: 2,
		width: 50,
	},
	toDoContainer: {
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		padding: 8,
	},
	toDoText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	toDoDateAdded: {
		color: "#808080",
		fontSize: 16,
		fontStyle: "italic",
	},
	// entire modal, full screen size
	modalFullContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		flex: 1,
		justifyContent: "start",
		alignItems: "center",
	},
	// modal container of data
	modalCenterContainer: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
		marginTop: 75,
		padding: 15,
		position: "relative",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		width: "95%",
	},
	modalCloseButton: {
		position: "absolute",
		top: 10,
		right: 15,
	},
	spinnerText: {
		color: "#fff",
	},
});
