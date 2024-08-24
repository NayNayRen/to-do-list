import { createToDo } from "../../db/appwrite";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../db/appwrite";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import EmptyList from "../../components/EmptyList";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import ToDoItem from "../../components/ToDoItem";
import uuid from "react-native-uuid";
import { getUsersToDos, getCurrentUser, deleteToDo } from "../../db/appwrite";
import useAppwrite from "../../db/useAppwrite";
import {
	StyleSheet,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	Text,
	RefreshControl,
	Image,
} from "react-native";

const Home = () => {
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const { data: toDosData, refetch } = useAppwrite(getUsersToDos);
	const [refreshing, setRefreshing] = useState(false);
	const [toDos, setToDos] = useState([]);
	const [inputText, setInputText] = useState("");
	const addTypedInput = (inputTextValue) => setInputText(inputTextValue);

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	// delete to do
	const removeToDo = (id) => {
		deleteToDo(id);
		setTimeout(() => {
			onRefresh();
		}, 250);
		// setToDos((previousList) => {
		// 	// filtering toDos, bring back toDos that don't match the id passed as a prop
		// 	return previousList.filter((item) => item.id != id);
		// });
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
				let id = uuid.v4();
				createToDo(id, inputText);
				return [{ id: id, text: inputText }, ...previousList];
			});
		}
		setTimeout(() => {
			onRefresh();
		}, 250);
	};

	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5">
			<View className="w-full flex flex-column items-end">
				<Header title="Your List of To Dos" />
				{/* sign out button */}
				<TouchableOpacity
					onPress={() => {
						signOut();
					}}
				>
					<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
				</TouchableOpacity>
			</View>
			{/* <View className="w-[45px] h-[45px] rounded-lg justify-center items-center">
				<Image
					source={{ uri: currentUserData.avatar }}
					className="w-full h-full rounded-lg"
					resizeMode="cover"
				/>
			</View> */}
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
					data={toDosData}
					renderItem={({ item }) => (
						<ToDoItem item={item} deleteToDo={removeToDo} />
					)}
					ListEmptyComponent={() => (
						<EmptyList
							title="Doesn't seem to be anything here..."
							subtitle="Add your first To Do."
						/>
					)}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
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
