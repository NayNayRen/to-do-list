import {
	createToDo,
	getAllToDos,
	getSingleToDo,
	getCurrentUser,
	deleteToDo,
	signOut,
} from "../../db/appwrite";
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
	RefreshControl,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Modal,
	Text,
} from "react-native";

const Home = () => {
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const { data: allToDosData, refetch } = useAppwrite(getAllToDos);
	const [refreshing, setRefreshing] = useState(false);
	const [toDos, setToDos] = useState([]);
	const [inputText, setInputText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={styles.container} className="px-3 pt-5 min-h-[85vh]">
				<KeyboardAvoidingView className="w-full flex flex-col items-end">
					<Header title="Your List of To Dos" />
					{/* sign out button */}
					{/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
					<TouchableOpacity onPress={() => signOut()}>
						<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
					</TouchableOpacity>
					<View className="rounded-full justify-center items-center w-full">
						<Avatar user={currentUserData} />
					</View>
					{/* add to do input */}
					<View className="w-full">
						<CustomInput
							value={inputText}
							handleChangeText={addTypedInput}
							placeholder="What would you like to add?"
							title="Add To Do"
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
									showModal={setModalVisible}
								/>
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
				{/* footer */}
				<View>
					<Footer />
				</View>
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
								<FontAwesome5 name="window-close" size={24} color="red" />
							</TouchableOpacity>
							<Text style={styles.modalText}>Hello World!</Text>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</TouchableWithoutFeedback>
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
	// entire modal, full screen size
	modalFullContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalCenterContainer: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
		// marginTop: 30,
		padding: 35,
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
