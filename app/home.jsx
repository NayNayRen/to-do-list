import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import Header from "../components/Header";
import uuid from "react-native-uuid";
import { router } from "expo-router";
import Footer from "../components/Footer";
import AddToDoInput from "../components/AddToDoInput";
import ToDoItem from "../components/ToDoItem";

const Home = () => {
	const [items, setItems] = useState([]);
	// delete to do
	const deleteToDo = (id) => {
		setItems((previousList) => {
			// filtering items, bring back items that don't match the id passed as a prop
			return previousList.filter((item) => item.id != id);
		});
	};
	// add to do
	const addToDo = (inputText) => {
		if (!inputText) {
			Alert.alert(
				"Error",
				"You need something in the text to add to your To Dos..."
			);
		} else {
			setItems((previousList) => {
				return [{ id: uuid.v4(), text: inputText }, ...previousList];
			});
		}
	};

	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5">
			<View className="w-full">
				<Header />
				<View className="flex flex-row items-center justify-start my-2">
					<FontAwesome
						name="long-arrow-alt-left"
						size={34}
						color="#00aeef"
						onPress={() => router.push("/")}
					/>
				</View>
			</View>
			<View className=" w-full">
				<AddToDoInput addToDo={addToDo} />
			</View>
			<FlatList
				data={items}
				renderItem={({ item }) => (
					<ToDoItem item={item} deleteToDo={deleteToDo} />
				)}
			/>
			<View>
				<Footer />
			</View>
			<StatusBar backgroundColor="#000" style="light" />
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
