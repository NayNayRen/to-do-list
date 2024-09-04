import { getDateTime } from "../js/helperFunctions";
import { updateToDo, getSingleToDo, deleteToDo } from "../db/appwrite";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

// passed props of item and functions from index.jsx
export default function ToDoItem({ item, refetch }) {
	const createdDateTime = getDateTime(item.$createdAt, false);
	const updatedDateTime = getDateTime(item.$updatedAt, false);
	const [modalVisible, setModalVisible] = useState(false);
	const [spinnerVisibile, setSpinnerVisibile] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const [inputText, setInputText] = useState(item.body);
	const [toDos, setToDos] = useState([]);

	// updates the input text
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// gets the todo body for the update modal
	const getToDoForModal = async (id) => {
		setModalVisible(true);
		const toDo = await getSingleToDo(id);
		addTypedInput(toDo.body);
		// console.log(toDo);
	};

	// delete to do
	const removeToDo = async (id) => {
		setSpinnerVisibile(true);
		setSpinnerText("Removing To Do...");
		await deleteToDo(id);
		setToDos((previousList) => {
			// filtering todo, bring back todos that don't match the id passed as a prop
			return previousList.filter((toDo) => toDo.id != id);
		});
		await refetch();
		setTimeout(() => {
			setSpinnerVisibile(false);
		}, 500);
	};

	// updates the todo body via modal button
	const update = async () => {
		setSpinnerVisibile(true);
		setSpinnerText("Updating To Do...");
		await updateToDo(item.$id, inputText);
		await refetch();
		setModalVisible(false);
		setTimeout(() => {
			setSpinnerVisibile(false);
		}, 500);
	};

	return (
		<View>
			<Spinner
				visible={spinnerVisibile}
				textContent={spinnerText}
				textStyle={styles.spinnerText}
				overlayColor="rgba(0, 0, 0, 0.8)"
			/>
			{/* to do container */}
			<View style={styles.toDoContainer} className="w-full">
				<View className="w-[90%]">
					<Text style={styles.toDoText}>{item.body}</Text>
					<Text style={styles.toDoDateAdded}>
						<Text className="text-black">Created:</Text>
						{createdDateTime.weekdayShort} {createdDateTime.monthNameShort}{" "}
						{createdDateTime.day} - {createdDateTime.time12}
					</Text>
					<Text style={styles.toDoDateAdded}>
						<Text className="text-black">Updated:</Text>
						{updatedDateTime.weekdayShort} {updatedDateTime.monthNameShort}{" "}
						{updatedDateTime.day} - {updatedDateTime.time12}
					</Text>
				</View>
				<View style={styles.toDoButtonContainer}>
					<TouchableOpacity
						className="w-[35px] m-2"
						onPress={() => removeToDo(item.todoId)}
					>
						<FontAwesome name="minus-square" size={24} color="red" />
					</TouchableOpacity>
					<TouchableOpacity
						className="w-[35px] m-2"
						onPress={() => {
							getToDoForModal(item.$id);
						}}
					>
						<FontAwesome name="edit" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
			{/* update modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<View style={styles.modalFullContainer}>
					<View style={styles.modalCenterContainer}>
						<TouchableOpacity
							style={styles.modalCloseButton}
							onPress={() => setModalVisible(false)}
						>
							<FontAwesome name="window-close" size={24} color="red" />
						</TouchableOpacity>
						<CustomInput
							title="Update To Do"
							titleStyles="text-black"
							value={inputText}
							handleChangeText={addTypedInput}
							placeholder="Can't update something that's not there..."
							extraStyles="text-black bg-white border border-b-black border-x-0 border-t-0"
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
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		padding: 8,
	},
	toDoText: {
		fontSize: 18,
		fontWeight: "semibold",
		marginBottom: 5,
	},
	toDoDateAdded: {
		color: "#808080",
		fontSize: 14,
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
