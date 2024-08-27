import { createUser, signIn } from "../../db/appwrite";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

const SignUp = () => {
	const [isSubmitting, setisSubmitting] = useState(false);
	// form for sign up data
	const [form, setForm] = useState({
		email: "",
		name: "",
		password: "",
	});

	// submit function to sign up
	const submit = async () => {
		if (!form.name || !form.email || !form.password) {
			Alert.alert("Error", "All fields must have valid user information.");
		}
		setisSubmitting(true);
		try {
			await createUser(form.email, form.password, form.name);
			// console.log("User Created");
			// console.log(result);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setisSubmitting(false);
		}
	};

	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[85vh]">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
						value={form.name}
						placeholder="Your name please..."
						handleChangeText={(e) => setForm({ ...form, name: e })}
					/>
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
						title="Sign Up"
						extraStyles="bg-[#00aeef]"
						isLoading={isSubmitting}
					/>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
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
