import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// passed props of item and deleteToDo function from index.jsx
export default function ToDoItem({ item, deleteToDo }) {
	return (
		<TouchableOpacity style={styles.listItem}>
			<View style={styles.listItemView}>
				<Text style={styles.listItemText}>{item.text}</Text>
				<FontAwesome
					name="close"
					size={24}
					color="red"
					onPress={() => deleteToDo(item.id)}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: "#cdcdcd",
		borderBottomWidth: 1,
		borderColor: "#808080",
		padding: 15,
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
