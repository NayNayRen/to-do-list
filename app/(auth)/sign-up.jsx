import { createUser } from "../../db/appwrite";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState } from "react";

const SignUp = () => {
	// form for sign up data
	const [form, setForm] = useState({
		email: "",
		name: "",
		password: "",
	});
	const [isSubmitting, setisSubmitting] = useState(false);

	// submit function to sign up
	const submit = async () => {
		if (!form.name || !form.email || !form.password) {
			Alert.alert("Error", "All fields must have valid user information.");
		}
		setisSubmitting(true);
		try {
			const result = await createUser(form.email, form.password, form.name);
			// console.log("User Created");
			console.log(result);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setisSubmitting(false);
		}
	};
	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5 min-h-[85vh]">
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
			<View className="flex flex-column items-center justify-center">
				<Text className="text-white">Already one of us?</Text>
				<Link href="/sign-in" className="text-xl font-bold text-[#00aeef] mt-3">
					Sign In{" "}
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

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
