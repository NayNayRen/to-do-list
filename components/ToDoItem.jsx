import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { getDateTime } from "../js/helperFunctions";

// passed props of item and functions from index.jsx
export default function ToDoItem({ item, deleteToDo, getToDo, showModal }) {
	const dateTime = getDateTime(item.$createdAt, false);

	return (
		<TouchableOpacity
			style={styles.listItemView}
			className="w-full"
			onPress={() => {
				getToDo(item.$id);
				setTimeout(() => {
					showModal(true);
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
});
