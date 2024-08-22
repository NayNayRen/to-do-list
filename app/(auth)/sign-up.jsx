import { createUser } from "../../db/appwrite";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React from "react";

const SignUp = () => {
	const submit = async () => {
		try {
			const result = await createUser();
			console.log("User Created");
			// soon will get set to global state...
			console.log(result);
		} catch (error) {
			Alert.alert("Error", error.message);
		}
	};
	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5">
			<View className="w-full">
				<Header title="Sign Up With Us" />
				{/* back button */}
				<View className="flex flex-row items-center justify-start my-2">
					<FontAwesome
						name="long-arrow-alt-left"
						size={34}
						color="#00aeef"
						onPress={() => router.push("/")}
					/>
				</View>
			</View>
			<Text className="text-white">SignUp</Text>
			<CustomButton
				handlePressAction={submit}
				title="Sign Up"
				extraStyles="bg-red-500"
			/>
			{/* footer */}
			<View>
				<Footer />
			</View>
		</SafeAreaView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
