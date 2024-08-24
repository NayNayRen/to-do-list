import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// passed props of item and deleteToDo function from index.jsx
export default function ToDoItem({ item, deleteToDo }) {
	return (
		<TouchableOpacity style={styles.listItem}>
			<View style={styles.listItemView} className="w-full">
				<View>
					<Text style={styles.listItemText}>{item.body}</Text>
					<Text>{item.$createdAt}</Text>
				</View>
				<FontAwesome
					name="close"
					size={28}
					color="red"
					onPress={() => deleteToDo(item.todoId)}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderColor: "#808080",
		padding: 10,
	},
	listItemView: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	listItemText: {
		fontSize: 20,
	},
});
