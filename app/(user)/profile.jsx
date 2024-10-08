import { getDateTime } from "../../js/helperFunctions";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import Avatar from "../../components/Avatar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { toTitleCase } from "../../js/helperFunctions";
import {
	signOut,
	updateUserName,
	updateUserEmail,
	deactivateCurrentUser,
} from "../../db/appwrite";
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
	const [nameInputText, setNameInputText] = useState("");
	const [emailInputText, setEmailInputText] = useState("");
	const [passwordInputText, setPasswordInputText] = useState("");
	const [editNameModalVisible, setEditNameModalVisible] = useState(false);
	const [editEmailModalVisible, setEditEmailModalVisible] = useState(false);
	const [deactivateUserModalVisible, setDeactivateUserModalVisible] =
		useState(false);
	const [spinnerVisible, setSpinnerVisible] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const createdDateTime = getDateTime(user?.$createdAt, false);
	const updatedDateTime = getDateTime(user?.$updatedAt, false);
	const [focusedInput, setFocusedInput] = useState(false);

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
		setSpinnerVisible(true);
		setSpinnerText("Signing Out...");
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/");
	};

	// update user name and avatar
	const updateName = async () => {
		const formattedName = toTitleCase(nameInputText);
		if (!nameInputText) {
			Alert.alert(
				"No Updated Name",
				"Name input was left empty. We need something to update it to."
			);
			setNameInputText("");
		} else if (formattedName === user?.name) {
			Alert.alert(
				"Current Name",
				"That's your current name. Provide a new one to continue."
			);
			setNameInputText("");
		} else {
			setSpinnerVisible(true);
			setSpinnerText("Updating User Name...");
			setNameInputText(formattedName);
			const results = await updateUserName(formattedName);
			setUser(results);
			setEditNameModalVisible(false);
			setSpinnerVisible(false);
			setNameInputText("");
		}
	};

	// update user email
	const updateEmail = async () => {
		if (!emailInputText) {
			Alert.alert(
				"Empty Inputs",
				"A new email is needed in order to update your current one."
			);
			setPasswordInputText("");
		} else if (passwordInputText.length < 8) {
			Alert.alert(
				"Password Too Short",
				"Your password needs to be the same 8 or more character one used to log in."
			);
			setPasswordInputText("");
		} else if (emailInputText === user?.email) {
			Alert.alert(
				"Current Email",
				"That's your current email. Provide a new one for us to update."
			);
			setPasswordInputText("");
		} else {
			setSpinnerVisible(true);
			setSpinnerText("Updating User Email...");
			setEmailInputText(emailInputText);
			const results = await updateUserEmail(emailInputText, passwordInputText);
			setUser(results);
			setEditEmailModalVisible(false);
			setSpinnerVisible(false);
			setEmailInputText("");
			setPasswordInputText("");
		}
	};

	// deactivate user
	const deactivateUser = async () => {
		await deactivateCurrentUser();
		await logOut();
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<ScrollView contentContainerStyle={{ minHeight: "100%" }}>
				<View
					style={styles.container}
					className="px-3 py-5 w-full min-h-[80vh]"
				>
					<Spinner
						visible={spinnerVisible}
						textContent={spinnerText}
						textStyle={styles.spinnerText}
						overlayColor="rgba(0, 0, 0, 0.8)"
					/>
					<View className="w-full">
						<View className="w-full mb-10">
							<Header title="Welcome To Your Profile" />
							<View className="rounded-full justify-center items-center w-full">
								<Avatar avatar={user?.avatar} />
							</View>
							<View className="justify-center items-end w-full">
								<TouchableOpacity onPress={logOut}>
									<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
								</TouchableOpacity>
							</View>
						</View>
						{/* user name */}
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Name</Text>
								<Text style={styles.userText}>{user?.name}</Text>
								<Text style={styles.userDisclaimer}>
									* If a name change is needed, a different name will be
									required. Cannot use the current name.
								</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										setEditNameModalVisible(true);
										setFocusedInput(true);
									}}
								>
									<FontAwesome5 name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						{/* user email */}
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Email</Text>
								<Text style={styles.userText}>{user?.email}</Text>
								<Text style={styles.userDisclaimer}>
									* If an email change is needed, a different email will be
									required. Cannot use the current email. Your current password
									is also required.
								</Text>
							</View>
							<View style={styles.userButtonContainer}>
								<TouchableOpacity
									className="w-[35px]"
									onPress={() => {
										setEditEmailModalVisible(true);
										setFocusedInput(true);
									}}
								>
									<FontAwesome5 name="edit" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
						{/* created date */}
						<View style={styles.userContainer} className="w-full">
							<View style={styles.userDetails}>
								<Text style={styles.userTitle}>Joined</Text>
								<Text style={styles.userText}>
									{createdDateTime.weekdayShort}{" "}
									{createdDateTime.monthNameShort} {createdDateTime.day} -{" "}
									{createdDateTime.time12}
								</Text>
								<Text style={styles.userDisclaimer}>
									* The day, month, date, and time you joined with us.
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
								<Text style={styles.userDisclaimer}>
									* The day, month, date, and time of the last time you update
									your user data.
								</Text>
							</View>
						</View>
						<View style={styles.userDeleteContainer}>
							<View style={styles.userDeleteHeading}>
								<FontAwesome name="warning" size={30} color="#ff0000" />
								<Text className="text-2xl text-center text-[#ff0000]">
									DANGER
								</Text>
								<FontAwesome name="warning" size={30} color="#ff0000" />
							</View>
							<Text className="text-white text-center">
								Tread lightly, the ability to deactivate your account and data
								is below.
							</Text>
						</View>
						<CustomButton
							title="Deactivate Account"
							extraStyles="bg-[#ff0000]"
							handlePressAction={() => {
								setDeactivateUserModalVisible(true);
							}}
						/>
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
									<FontAwesome5 name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<CustomInput
									title="Edit User Name"
									titleStyles="text-black"
									value={nameInputText}
									handleChangeText={addNameInput}
									placeholder={user?.name}
									placeholderTextColor="#808080"
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
									focusedInput={focusedInput}
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
									<FontAwesome5 name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<CustomInput
									title="Edit User Email"
									titleStyles="text-black"
									value={emailInputText}
									handleChangeText={addEmailInput}
									keyboardType="email-address"
									placeholder={user?.email}
									placeholderTextColor="#808080"
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
									focusedInput={focusedInput}
								/>
								<CustomInput
									title="Password"
									titleStyles="text-black"
									value={passwordInputText}
									handleChangeText={addPasswordInput}
									placeholder="Your current password please..."
									placeholderTextColor="#808080"
									extraStyles="text-black bg-white border border-b-[#cdcdcd] border-x-0 border-t-0"
								/>
								<CustomButton
									title="Update User Email"
									extraStyles="bg-[#00aeef]"
									handlePressAction={updateEmail}
								/>
							</View>
						</View>
					</Modal>
					{/* deactivate user modal */}
					<Modal
						animationType="fade"
						transparent={true}
						visible={deactivateUserModalVisible}
						onRequestClose={() => {
							setDeactivateUserModalVisible(false);
						}}
					>
						<View style={styles.modalFullContainer}>
							<View style={styles.modalCenterContainer}>
								<TouchableOpacity
									style={styles.modalCloseButton}
									onPress={() => setDeactivateUserModalVisible(false)}
								>
									<FontAwesome5 name="window-close" size={24} color="#ff0000" />
								</TouchableOpacity>
								<Text className="text-xl text-left mb-2 font-bold mt-5 w-full">
									Are You Sure?
								</Text>
								<Text className="text-lg">
									Continuing will deactivate your account. In doing so, any data
									related to your account will be lost as well.
								</Text>
								<CustomButton
									title="Deactivate Account"
									extraStyles="bg-[#ff0000]"
									handlePressAction={deactivateUser}
								/>
							</View>
						</View>
					</Modal>
					{/* footer */}
					<View className="w-full items-center justify-center">
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
	userDeleteContainer: {
		alignItems: "center",
		borderColor: "#ff0000",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		justifyContent: "center",
		marginBottom: 20,
		marginTop: 40,
		paddingBottom: 40,
		paddingTop: 40,
	},
	userDeleteHeading: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginBottom: 10,
		width: "100%",
	},
	userDetails: {
		alignItems: "start",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 5,
		paddingTop: 5,
		width: "90%",
	},
	userDisclaimer: {
		fontSize: 14,
		fontStyle: "italic",
		marginTop: 10,
	},
	userTitle: {
		borderBottomColor: "#00aeef",
		borderBottomWidth: 1,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		paddingBottom: 5,
		width: 200,
	},
	userText: {
		fontSize: 18,
	},
});
