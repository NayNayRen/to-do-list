import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import EmptyList from "../../components/EmptyList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import ToDoItem from "../../components/ToDoItem";
import useAppwrite from "../../db/useAppwrite";
import uuid from "react-native-uuid";
import {
	createToDo,
	getAllToDos,
	getSingleToDo,
	getCurrentUser,
	deleteToDo,
	signOut,
} from "../../db/appwrite";
import {
	StyleSheet,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
} from "react-native";

const Home = () => {
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const { data: allToDosData, refetch } = useAppwrite(getAllToDos);
	const [refreshing, setRefreshing] = useState(false);
	const [toDos, setToDos] = useState([]);
	const [inputText, setInputText] = useState("");

	// updates the input text, also used to clear it
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	// delete to do
	const removeToDo = async (id) => {
		await deleteToDo(id);
		setToDos((previousList) => {
			// filtering todo, bring back todos that don't match the id passed as a prop
			return previousList.filter((toDo) => toDo.id != id);
		});
		onRefresh();
		// setTimeout(() => {
		// 	onRefresh();
		// }, 250);
	};

	// add to do
	const addToDo = async (inputText) => {
		if (!inputText) {
			Alert.alert(
				"Error",
				"You need something in the text to add to your To Dos..."
			);
		} else {
			setToDos((previousList) => {
				let newId = uuid.v4();
				createToDo(newId, inputText);
				return [{ id: newId, text: inputText }, ...previousList];
			});
		}
		addTypedInput("");
		onRefresh();
		// setTimeout(() => {
		// 	onRefresh();
		// }, 250);
	};

	// logs user out
	const logOut = async () => {
		await signOut();
	};

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<SafeAreaView className="bg-black h-full">
			<View style={styles.container} className="px-3 py-5 min-h-[85vh]">
				{/* <KeyboardAvoidingView className="w-full flex flex-col items-end"> */}
				<Header title="Your List of To Dos" />
				{/* sign out button */}
				<View className="justify-center items-end w-full">
					<TouchableOpacity onPress={() => logOut()}>
						<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
					</TouchableOpacity>
				</View>
				<View className="rounded-full justify-center items-center w-full">
					<Avatar user={currentUserData} />
				</View>
				{/* add to do input */}
				<View className="w-full h-full">
					<CustomInput
						title="To Do"
						titleStyles="text-white"
						value={inputText}
						handleChangeText={addTypedInput}
						placeholder="What would you like to add?"
						extraStyles="text-white bg-black border border-b-white"
					/>
					<CustomButton
						handlePressAction={addToDo}
						inputText={inputText}
						title="Add To Do"
						extraStyles="bg-[#00aeef]"
					/>
					{/* display for added todos */}
					<FlatList
						data={allToDosData}
						renderItem={({ item }) => (
							<ToDoItem
								key={item.id}
								item={item}
								deleteToDo={removeToDo}
								getToDo={getSingleToDo}
							/>
						)}
						// ListHeaderComponent={() => (
						// 	<View className="my-6 px-4">
						// 		<View className="justify-between items-start flex-row mb-6">
						// 			<View>
						// 				<Text className="text-lg text-gray-100">
						// 					Welcome Back...
						// 				</Text>
						// 				<Text className="text-2xl text-white">Jedi Mind</Text>
						// 			</View>
						// 		</View>
						// 	</View>
						// )}
						// ListFooterComponent={() => (
						// 	<SomeComponents>
						// 	  ...Some components those need to be below the list
						// 	</SomeComponents>
						//   )}
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
				{/* </KeyboardAvoidingView> */}
				{/* footer */}
			</View>
			<View>
				<Footer />
			</View>
		</SafeAreaView>
		// </TouchableWithoutFeedback>
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
