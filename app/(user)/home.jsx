import { createToDo } from "../../db/appwrite";
import {
	getUsersToDos,
	getCurrentUser,
	deleteToDo,
	signOut,
} from "../../db/appwrite";
import { router } from "expo-router";
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
	StyleSheet,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	Text,
	RefreshControl,
	KeyboardAvoidingView,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
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
		setToDos((previousList) => {
			deleteToDo(id);
			// filtering todo, bring back todos that don't match the id passed as a prop
			return previousList.filter((toDo) => toDo.id != id);
		});
		setTimeout(() => {
			onRefresh();
		}, 250);
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
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[85vh]">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView className="w-full flex flex-col items-end">
					<Header title="Your List of To Dos" />
					{/* sign out button */}
					<TouchableOpacity
						onPress={() => {
							signOut();
						}}
					>
						<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
					</TouchableOpacity>
					<View className="rounded-full justify-center items-center w-full">
						<Avatar user={currentUserData} />
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
						{/* display for added to dos */}
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
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
			{/* footer */}
			<View>
				<Footer />
			</View>
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
