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
	const [inputText, setInputText] = useState("");
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
		await updateToDo(item.$id);
		// setTimeout(() => {
		// 	onRefresh();
		// }, 250);
	};

	return (
		<>
			<TouchableOpacity
				style={styles.listItemView}
				className="w-full"
				onPress={() => {
					// getToDo(item.$id);
					setTimeout(() => {
						setModalVisible(true);
					}, 250);
				}}
			>
				<View className="w-[90%]">
					<Text style={styles.listItemBody}>{item.body}</Text>
					<Text style={styles.listItemDate}>
						{dateTime.weekdayShort} {dateTime.monthNameShort} {dateTime.day} -{" "}
						{dateTime.time12}
					</Text>
				</View>
				<TouchableOpacity
					className="w-[35px]"
					onPress={() => deleteToDo(item.todoId)}
				>
					<FontAwesome name="minus-square" size={24} color="red" />
				</TouchableOpacity>
			</TouchableOpacity>
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
							value={item.body}
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
		</>
	);
}

const styles = StyleSheet.create({
	listItemView: {
		alignItems: "center",
		backgroundColor: "#fff",
		borderBottomWidth: 2,
		borderColor: "#000",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 10,
		paddingLeft: 10,
		paddingTop: 10,
	},
	listItemBody: {
		fontSize: 20,
		fontWeight: "semibold",
	},
	listItemDate: {
		color: "#808080",
		fontSize: 16,
		fontStyle: "italic",
	},
	// entire modal, full screen size
	modalFullContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	// modal container of data
	modalCenterContainer: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
		// marginTop: 30,
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
