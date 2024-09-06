import { createUser, signIn } from "../../db/appwrite";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useGlobalContext } from "../../context/GlobalProvider";
import { toTitleCase } from "../../js/helperFunctions";
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const SignUp = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [spinner, setSpinner] = useState(false);
	// form for sign up data
	const [form, setForm] = useState({
		email: "",
		name: "",
		password: "",
	});

	// submit function to sign up
	const submit = async () => {
		if (!form.name || !form.email || !form.password) {
			Alert.alert(
				"Empty Inputs",
				"All fields must have valid user information."
			);
		} else {
			setIsSubmitting(true);
			try {
				setSpinner(true);
				const formattedName = toTitleCase(form.name);
				const result = await createUser(
					form.email,
					form.password,
					formattedName
				);
				await signIn(form.email, form.password);
				setUser(result);
				setIsLoggedIn(true);
				router.replace("/home");
			} catch (error) {
				Alert.alert("Invalid Credentials", error.message);
			} finally {
				setIsSubmitting(false);
				setSpinner(false);
			}
		}
	};

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<SafeAreaView className="bg-black h-full">
			<ScrollView>
				<View style={styles.container} className="px-3 py-5 min-h-[100vh]">
					<Spinner
						visible={spinner}
						textContent={"Registered & Logging In..."}
						textStyle={styles.spinnerText}
						overlayColor="rgba(0, 0, 0, 0.8)"
					/>
					<KeyboardAvoidingView className="w-full flex flex-col items-end">
						<View className="w-full">
							<Header title="Sign Up With Us" />
							{/* back button */}
							<TouchableOpacity className="flex flex-row items-center justify-start my-2">
								<FontAwesome
									name="long-arrow-alt-left"
									size={40}
									color="#00aeef"
									onPress={() => router.push("/")}
								/>
							</TouchableOpacity>
						</View>
						<CustomInput
							title="Name"
							titleStyles="text-white"
							value={form.name}
							placeholder="Your name please..."
							handleChangeText={(e) => setForm({ ...form, name: e })}
							extraStyles="text-white bg-black border border-b-white"
						/>
						<CustomInput
							title="Email"
							titleStyles="text-white"
							value={form.email}
							placeholder="Your email please..."
							handleChangeText={(e) => setForm({ ...form, email: e })}
							keyboardType="email-address"
							extraStyles="text-white bg-black border border-b-white"
						/>
						<CustomInput
							title="Password"
							titleStyles="text-white"
							value={form.password}
							placeholder="A password please..."
							handleChangeText={(e) => setForm({ ...form, password: e })}
							extraStyles="text-white bg-black border border-b-white"
						/>
						<CustomButton
							handlePressAction={submit}
							title="Sign Up"
							extraStyles="bg-[#00aeef]"
							isLoading={isSubmitting}
						/>
					</KeyboardAvoidingView>

					<View className="flex flex-col items-center justify-center">
						<Text className="text-white">Already one of us?</Text>
						<TouchableOpacity
							className="flex flex-row items-center justify-center mt-3"
							onPress={() => router.push("/sign-in")}
						>
							<Text className="text-2xl font-bold text-[#00aeef] mr-2">
								Sign In
							</Text>
							<FontAwesome name="sign-in-alt" size={24} color="#00aeef" />
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

export default SignUp;

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
