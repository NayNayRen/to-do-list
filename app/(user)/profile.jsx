import { getDateTime } from "../../js/helperFunctions";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, signOut } from "../../db/appwrite";
import { router } from "expo-router";
import Avatar from "../../components/Avatar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import useAppwrite from "../../db/useAppwrite";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

const Profile = () => {
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const [spinnerVisibile, setSpinnerVisibile] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");
	const createdDateTime = getDateTime(currentUserData.$createdAt, false);
	// logs user out
	const logOut = async () => {
		setSpinnerVisibile(true);
		setSpinnerText("Signing Out...");
		await signOut();
		setTimeout(() => {
			router.replace("/");
		}, 500);
	};

	return (
		<SafeAreaView className="bg-black py-5 px-3 h-full">
			<Spinner
				visible={spinnerVisibile}
				textContent={spinnerText}
				textStyle={styles.spinnerText}
				overlayColor="rgba(0, 0, 0, 0.8)"
			/>
			<ScrollView>
				<View className="w-full">
					<Header title="Welcome To Your Profile" />
					<View className="rounded-full justify-center items-center w-full">
						<Avatar user={currentUserData} />
					</View>
					<View className="justify-center items-end w-full">
						<TouchableOpacity
							onPress={() => {
								logOut();
							}}
						>
							<FontAwesome5 name="sign-out-alt" size={30} color="#00aeef" />
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Text className="text-white text-lg">
						Joined On : {createdDateTime.weekdayShort}{" "}
						{createdDateTime.monthNameShort} {createdDateTime.day} -{" "}
						{createdDateTime.time12}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	spinnerText: {
		color: "#fff",
	},
});
