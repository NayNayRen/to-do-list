import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn, getCurrentUser } from "../../db/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const SignIn = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	// validates and signs in, activates spinner too
	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Empty Inputs", "Both an email and password are required.");
		} else {
			setIsSubmitting(true);
			try {
				setSpinner(true);
				await signIn(form.email, form.password);
				const result = await getCurrentUser();
				setUser(result);
				setIsLoggedIn(true);
				router.replace("/home");
			} catch (error) {
				setSpinner(false);
				Alert.alert(
					"Invalid Credentials",
					"Email or password is incorrect. Please try again."
				);
				console.log(error.message);
			} finally {
				setIsSubmitting(false);
				setSpinner(false);
			}
		}
	};

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<SafeAreaView className="bg-black h-full">
			<ScrollView contentContainerStyle={{ minHeight: "100%" }}>
				<View
					style={styles.container}
					className="px-3 py-5 w-full min-h-[100vh]"
				>
					<Spinner
						visible={spinner}
						textContent={"Signing In..."}
						textStyle={styles.spinnerText}
						overlayColor="rgba(0, 0, 0, 0.8)"
					/>

					<KeyboardAvoidingView className="w-full flex flex-col items-end">
						<View className="w-full">
							<Header title="Sign In With Us" />
							{/* back button */}
							<TouchableOpacity
								className="flex flex-row items-center justify-start my-2"
								onPress={() => router.push("/")}
							>
								<FontAwesome5 name="caret-left" size={40} color="#00aeef" />
							</TouchableOpacity>
						</View>

						<CustomInput
							title="Email"
							titleStyles="text-white"
							value={form.email}
							handleChangeText={(e) => setForm({ ...form, email: e })}
							keyboardType="email-address"
							placeholder="Your email please..."
							placeholderTextColor="#cdcdcd"
							extraStyles="text-white bg-black border border-b-white"
						/>
						<CustomInput
							title="Password"
							titleStyles="text-white"
							value={form.password}
							handleChangeText={(e) => setForm({ ...form, password: e })}
							placeholder="A password please..."
							placeholderTextColor="#cdcdcd"
							extraStyles="text-white bg-black border border-b-white"
						/>
						<CustomButton
							handlePressAction={submit}
							title="Sign In"
							extraStyles="bg-[#00aeef]"
							isLoading={isSubmitting}
						/>
					</KeyboardAvoidingView>

					<View className="flex flex-col items-center justify-center">
						<Text className="text-white">Not one of us?</Text>
						<TouchableOpacity
							className="flex flex-row items-center justify-center mt-3"
							onPress={() => router.push("/sign-up")}
						>
							<Text className="text-2xl font-bold text-[#00aeef] mr-2">
								Sign Up
							</Text>
							<FontAwesome5 name="sign-in-alt" size={24} color="#00aeef" />
						</TouchableOpacity>
					</View>
					{/* footer */}
					<View>
						<Footer />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
		// </TouchableWithoutFeedback>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	spinnerText: {
		color: "#fff",
	},
});
