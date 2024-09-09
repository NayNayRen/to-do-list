import { getDateTime } from "../../js/helperFunctions";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, updateUserName } from "../../db/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Avatar from "../../components/Avatar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const [inputText, setInputText] = useState(user?.name);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [spinnerVisibile, setSpinnerVisibile] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const createdDateTime = getDateTime(user?.$createdAt, false);
	const updatedDateTime = getDateTime(user?.$updatedAt, false);

	// updates the input text
	const addTypedInput = (inputTextValue) => {
		setInputText(inputTextValue);
	};

	// logs user out
	const logOut = async () => {
		setSpinnerVisibile(true);
		setSpinnerText("Signing Out...");
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/");
	};

	const updateName = async () => {
		await updateUserName(user?.name);
	};

	const updateEmail = async () => {
		console.log(user?.email);
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<ScrollView contentContainerStyle={{ minHeight: "100%" }}>
				<View
					style={styles.container}
					className="px-3 py-5 w-full min-h-[80vh]"
				>
					<Spinner
						visible={spinnerVisibile}
						textContent={spinnerText}
						textStyle={styles.spinnerText}
						overlayColor="rgba(0, 0, 0, 0.8)"
					/>
					<View className="w-full">
						<View className="w-full mb-5">
							<Header title="Welcome To Your Profile" />
							<View className="rounded-full justify-center items-center w-full">
								<Avatar user={user} />
							</View>
							<View className="justify-center items-end w-full">
								<TouchableOpacity onPress={logOut}>
									<FontAwesome name="sign-out-alt" size={30} color="#00aeef" />
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Name</Text>
								<Text style={styles.userText}>{user?.name}</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										setEditModalVisible(true);
									}}
								>
									<FontAwesome name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Email</Text>
								<Text style={styles.userText}>{user?.email}</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										updateEmail();
									}}
								>
									<FontAwesome name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Joined</Text>
								<Text style={styles.userText} className="mb-[5px]">
									{createdDateTime.weekdayShort}{" "}
									{createdDateTime.monthNameShort} {createdDateTime.day} -{" "}
									{createdDateTime.time12}
								</Text>
							</View>
						</View>
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Updated</Text>
								<Text style={styles.userText}>
									{updatedDateTime.weekdayShort}{" "}
									{updatedDateTime.monthNameShort} {updatedDateTime.day} -{" "}
									{updatedDateTime.time12}
								</Text>
							</View>
						</View>
					</View>
					{/* update modal */}
					<Modal
						animationType="fade"
						transparent={true}
						visible={editModalVisible}
						onRequestClose={() => {
							setEditModalVisible(false);
						}}
					>
						<View style={styles.modalFullContainer}>
							<View style={styles.modalCenterContainer}>
								<TouchableOpacity
									style={styles.modalCloseButton}
									onPress={() => setEditModalVisible(false)}
								>
									<FontAwesome name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<CustomInput
									title="Edit User"
									titleStyles="text-black"
									value={inputText}
									handleChangeText={addTypedInput}
									placeholder="Can't update something that's not there..."
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
								/>
								<CustomButton
									title="Update User"
									extraStyles="bg-[#00aeef]"
									handlePressAction={updateName}
								/>
							</View>
						</View>
					</Modal>
					{/* footer */}
					<View>
						<Footer />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "space-between",
	},
	// entire modal, full screen size
	modalFullContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		flex: 1,
		justifyContent: "start",
		alignItems: "center",
	},
	// modal container of data
	modalCenterContainer: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
		marginTop: 75,
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
	spinnerText: {
		color: "#fff",
	},
	userButtonContainer: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#808080",
		borderLeftWidth: 1,
		marginLeft: 2,
		width: 50,
	},
	userContainer: {
		alignItems: "start",
		backgroundColor: "#fff",
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		padding: 8,
	},
	userDetails: {
		alignItems: "start",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 5,
		paddingTop: 5,
		width: "90%",
	},
	userTitle: {
		borderBottomColor: "#00aeef",
		borderBottomWidth: 1,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		paddingBottom: 5,
		width: 150,
	},
	userText: {
		fontSize: 18,
		fontStyle: "italic",
	},
});
