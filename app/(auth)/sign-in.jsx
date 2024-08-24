import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import { signIn } from "../../db/appwrite";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "An email and password are both needed.");
		}
		setIsSubmitting(true);
		try {
			await signIn(form.email, form.password);
			router.replace("/home");
		} catch (error) {
			Alert.alert(
				"Invalid Credentials",
				"Your email or password is incorrect."
			);
			// console.log(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[85vh]">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView className="w-full flex flex-col items-end">
					<View className="w-full">
						<Header title="Sign In With Us" />
						{/* back button */}
						<TouchableOpacity
							className="flex flex-row items-center justify-start my-2"
							onPress={() => router.push("/")}
						>
							<FontAwesome
								name="long-arrow-alt-left"
								size={40}
								color="#00aeef"
							/>
						</TouchableOpacity>
					</View>

					<CustomInput
						title="Email"
						value={form.email}
						placeholder="Your email please..."
						handleChangeText={(e) => setForm({ ...form, email: e })}
						keyboardType="email-address"
					/>
					<CustomInput
						title="Password"
						value={form.password}
						placeholder="A password please..."
						handleChangeText={(e) => setForm({ ...form, password: e })}
					/>
					<CustomButton
						handlePressAction={submit}
						title="Sign In"
						extraStyles="bg-[#00aeef]"
						isLoading={isSubmitting}
					/>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
			<View className="flex flex-col items-center justify-center">
				<Text className="text-white">Not one of us?</Text>
				<TouchableOpacity
					className="flex flex-row items-center justify-center mt-3"
					onPress={() => router.push("/sign-up")}
				>
					<Text className="text-2xl font-bold text-[#00aeef] mr-2">
						Sign Up
					</Text>
					<FontAwesome name="sign-in-alt" size={24} color="#00aeef" />
				</TouchableOpacity>
			</View>
			{/* footer */}
			<View>
				<Footer />
			</View>
		</SafeAreaView>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
