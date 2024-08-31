import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { getDateTime } from "../js/helperFunctions";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { updateToDo } from "../db/appwrite";

// passed props of item and functions from index.jsx
export default function ToDoItem({ item, deleteToDo, getToDo }) {
	const dateTime = getDateTime(item.$createdAt, false);
	const [modalVisible, setModalVisible] = useState(false);
	const [inputText, setInputText] = useState(item.body);
	const [refreshing, setRefreshing] = useState(false);

	// updates the input text
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const update = async () => {
		// console.log(inputText);
		await updateToDo(item.$id, inputText);
		// setTimeout(() => {
		// 	onRefresh();
		// }, 250);
	};

	return (
		<View>
			{/* to do container */}
			<View style={styles.toDoContainer} className="w-full">
				<View className="w-[90%]">
					<Text style={styles.toDoText}>{item.body}</Text>
					<Text style={styles.toDoDateAdded}>
						{dateTime.weekdayShort} {dateTime.monthNameShort} {dateTime.day} -{" "}
						{dateTime.time12}
					</Text>
				</View>
				<View style={styles.toDoButtonContainer}>
					<TouchableOpacity
						className="w-[35px] m-2"
						onPress={() => deleteToDo(item.todoId)}
					>
						<FontAwesome name="minus-square" size={24} color="red" />
					</TouchableOpacity>
					<TouchableOpacity
						className="w-[35px] m-2"
						onPress={() => setModalVisible(true)}
					>
						<FontAwesome name="edit" size={24} color="darkgray" />
					</TouchableOpacity>
				</View>
			</View>
			{/* update modal */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.modalFullContainer}>
					<View style={styles.modalCenterContainer}>
						<TouchableOpacity
							style={styles.modalCloseButton}
							onPress={() => setModalVisible(!modalVisible)}
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
});
