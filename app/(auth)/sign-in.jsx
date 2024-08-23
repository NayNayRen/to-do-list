import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";
import { signIn } from "../../db/appwrite";

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
			// Alert.alert("Error", error.message);
			console.log(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[100vh]">
			<View className="w-full">
				<Header title="Sign In With Us" />
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
			<View className="flex flex-column items-center justify-center">
				<Text className="text-white">Not one of us?</Text>
				<Link href="/sign-up" className="text-xl font-bold text-[#00aeef] mt-3">
					Sign Up{" "}
					<FontAwesome
						name="sign-in-alt"
						size={24}
						color="#00aeef"
						// onPress={() => router.push("/sign-in")}
					/>
				</Link>
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
