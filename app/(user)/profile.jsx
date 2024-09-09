import { getDateTime } from "../../js/helperFunctions";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../db/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Avatar from "../../components/Avatar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const [spinnerVisibile, setSpinnerVisibile] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const createdDateTime = getDateTime(user?.$createdAt, false);
	const updatedDateTime = getDateTime(user?.$updatedAt, false);

	// console.log(user);
	// logs user out
	const logOut = async () => {
		setSpinnerVisibile(true);
		setSpinnerText("Signing Out...");
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/");
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
									<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.userContainer} className="w-full">
							<Text style={styles.userText}>Name</Text>
							<Text style={styles.userText}>{user?.name}</Text>
						</View>
						<View style={styles.userContainer} className="w-full">
							<Text style={styles.userText}>Email</Text>
							<Text style={styles.userText}>{user?.email}</Text>
						</View>
						<View style={styles.userContainer} className="w-full">
							<Text style={styles.userText}>Joined</Text>
							<Text style={styles.userText}>
								{createdDateTime.weekdayShort} {createdDateTime.monthNameShort}{" "}
								{createdDateTime.day} - {createdDateTime.time12}
							</Text>
						</View>
						<View style={styles.userContainer} className="w-full">
							<Text style={styles.userText}>Updated</Text>
							<Text style={styles.userText}>
								{updatedDateTime.weekdayShort} {updatedDateTime.monthNameShort}{" "}
								{updatedDateTime.day} - {updatedDateTime.time12}
							</Text>
						</View>
					</View>
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
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	spinnerText: {
		color: "#fff",
	},
	userContainer: {
		alignItems: "start",
		backgroundColor: "#fff",
		borderRadius: 5,
		flexDirection: "column",
		justifyContent: "space-between",
		marginBottom: 5,
		padding: 8,
	},
	userText: {
		fontSize: 18,
		fontWeight: "semibold",
	},
});
