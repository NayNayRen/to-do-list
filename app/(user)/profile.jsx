import { getDateTime } from "../../js/helperFunctions";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, updateUserName, updateUserEmail } from "../../db/appwrite";
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
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const [nameInputText, setNameInputText] = useState(user?.name);
	const [emailInputText, setEmailInputText] = useState(user?.email);
	const [passwordInputText, setPasswordInputText] = useState("");
	const [editNameModalVisible, setEditNameModalVisible] = useState(false);
	const [editEmailModalVisible, setEditEmailModalVisible] = useState(false);
	const [spinnerVisibile, setSpinnerVisibile] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const createdDateTime = getDateTime(user?.$createdAt, false);
	const updatedDateTime = getDateTime(user?.$updatedAt, false);

	// updates user name input text
	const addNameInput = (inputTextValue) => {
		setNameInputText(inputTextValue);
	};

	// updates user email input text
	const addEmailInput = (inputTextValue) => {
		setEmailInputText(inputTextValue);
	};

	// updates pasword input text
	const addPasswordInput = (inputTextValue) => {
		setPasswordInputText(inputTextValue);
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

	// update user name and avatar
	const updateName = async () => {
		if (!nameInputText) {
			Alert.alert(
				"No Updated Name",
				"Name input was left empty. Your previous user name will be applied."
			);
			setEditNameModalVisible(false);
			setNameInputText(user?.name);
			const results = await updateUserName(user?.name);
			setUser(results);
		} else {
			setSpinnerVisibile(true);
			setSpinnerText("Updating User Name...");
			setNameInputText(nameInputText);
			const results = await updateUserName(nameInputText);
			setUser(results);
			setEditNameModalVisible(false);
			setSpinnerVisibile(false);
		}
	};

	// update user email
	const updateEmail = async () => {
		if (!emailInputText || !passwordInputText) {
			Alert.alert(
				"Empty Inputs",
				"Your email and password are both needed in order to update your email."
			);
			setPasswordInputText("");
		} else if (passwordInputText.length < 8) {
			Alert.alert(
				"Password Too Short",
				"Your password needs to be 8 or more characters in length."
			);
			setPasswordInputText("");
		} else {
			// setEditEmailModalVisible(false);
			// setEmailInputText(user?.email);
			// const results = await updateUserEmail(user?.email, passwordInputText);
			// setUser(results);
			// setPasswordInputText("");
			setSpinnerVisibile(true);
			setSpinnerText("Updating User Email...");
			setEmailInputText(emailInputText);
			const results = await updateUserEmail(emailInputText, passwordInputText);
			setUser(results);
			setEditEmailModalVisible(false);
			setSpinnerVisibile(false);
			setPasswordInputText("");
		}
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
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
								<Avatar avatar={user?.avatar} />
							</View>
							<View className="justify-center items-end w-full">
								<TouchableOpacity onPress={logOut}>
									<FontAwesome name="sign-out-alt" size={30} color="#00aeef" />
								</TouchableOpacity>
							</View>
						</View>
						{/* user name */}
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Name</Text>
								<Text style={styles.userText}>{nameInputText}</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										setEditNameModalVisible(true);
									}}
								>
									<FontAwesome name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						{/* user email */}
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Email</Text>
								<Text style={styles.userText}>{user?.email}</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										setEditEmailModalVisible(true);
									}}
								>
									<FontAwesome name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						{/* created date */}
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
						{/* updated date */}
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
					{/* user name update modal */}
					<Modal
						animationType="fade"
						transparent={true}
						visible={editNameModalVisible}
						onRequestClose={() => {
							setEditNameModalVisible(false);
						}}
					>
						<View style={styles.modalFullContainer}>
							<View style={styles.modalCenterContainer}>
								<TouchableOpacity
									style={styles.modalCloseButton}
									onPress={() => setEditNameModalVisible(false)}
								>
									<FontAwesome name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<CustomInput
									title="Edit User Name"
									titleStyles="text-black"
									value={nameInputText}
									handleChangeText={addNameInput}
									placeholder="You should provide a new name..."
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
								/>
								<CustomButton
									title="Update User Name"
									extraStyles="bg-[#00aeef]"
									handlePressAction={updateName}
								/>
							</View>
						</View>
					</Modal>
					{/* user email update modal */}
					<Modal
						animationType="fade"
						transparent={true}
						visible={editEmailModalVisible}
						onRequestClose={() => {
							setEditEmailModalVisible(false);
						}}
					>
						<View style={styles.modalFullContainer}>
							<View style={styles.modalCenterContainer}>
								<TouchableOpacity
									style={styles.modalCloseButton}
									onPress={() => setEditEmailModalVisible(false)}
								>
									<FontAwesome name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<CustomInput
									title="Edit User Email"
									titleStyles="text-black"
									value={emailInputText}
									handleChangeText={addEmailInput}
									placeholder="You should provide a new email..."
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
								/>
								{/*  */}
								<CustomInput
									title="Password"
									titleStyles="#000"
									value={passwordInputText}
									placeholder="Your password please..."
									handleChangeText={addPasswordInput}
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
								/>
								{/*  */}
								<CustomButton
									title="Update User Email"
									extraStyles="bg-[#00aeef]"
									handlePressAction={updateEmail}
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
