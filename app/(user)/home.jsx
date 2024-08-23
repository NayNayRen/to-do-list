import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	Text,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import EmptyList from "../../components/EmptyList";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import ToDoItem from "../../components/ToDoItem";
import uuid from "react-native-uuid";
import { signOut } from "../../db/appwrite";

const Home = () => {
	const [toDos, setToDos] = useState([]);
	const [inputText, setInputText] = useState("");
	const addTypedInput = (inputTextValue) => setInputText(inputTextValue);

	// delete to do
	const deleteToDo = (id) => {
		setToDos((previousList) => {
			// filtering toDos, bring back toDos that don't match the id passed as a prop
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
			setToDos((previousList) => {
				return [{ id: uuid.v4(), text: inputText }, ...previousList];
			});
		}
	};

	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[100vh]">
			<View className="w-full">
				<Header title="Your List of To Dos" />
				{/* sign out button */}
				<TouchableOpacity
					onPress={() => {
						signOut();
					}}
				>
					<Text className="text-white">Sign Out</Text>
				</TouchableOpacity>
			</View>
			{/* add to do input */}
			<View className="w-full">
				<CustomInput
					handleChangeText={addTypedInput}
					placeholder="What would you like to add?"
					title="To Do"
				/>
				<CustomButton
					handlePressAction={addToDo}
					inputText={inputText}
					title="Add To Do"
					extraStyles="bg-[#00aeef]"
				/>
			</View>
			{/* display for added to dos */}
			<View className="max-h-[400px]">
				<FlatList
					data={toDos}
					renderItem={({ item }) => (
						<ToDoItem item={item} deleteToDo={deleteToDo} />
					)}
					ListEmptyComponent={() => (
						<EmptyList
							title="Doesn't seem to be anything here..."
							subtitle="Add your first To Do."
						/>
					)}
				/>
			</View>
			{/* footer */}
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
