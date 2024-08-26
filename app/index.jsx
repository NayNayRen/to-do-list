import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useGlobalContext } from "../context/GlobalProvider";
import { signOut } from "../db/appwrite";

const Index = () => {
	// checking for logged in user, skips landing page if so
	const { isLoading, isLoggedIn } = useGlobalContext();
	if (!isLoading && isLoggedIn) {
		// auto redirects to your home page
		return <Redirect href="/home" />;
	}

	const logOut = async () => {
		return await signOut();
	};
	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5">
			<View className="w-full">
				<Header title="Something To Do..." />
				<TouchableOpacity
					onPress={() => {
						logOut();
					}}
				>
					<FontAwesome name="sign-out-alt" size={30} color="#00aeef" />
				</TouchableOpacity>
			</View>
			<View className="w-full">
				<Text
					style={styles.greeting}
					className="text-2xl text-white text-center pb-2"
				>
					What would <Text className="italic">YOU</Text> like To Do?
				</Text>
				<View className="mt-4">
					<TouchableOpacity
						className="flex flex-row items-center justify-center mt-4"
						onPress={() => router.push("/sign-up")}
					>
						<Text className="text-[#00aeef] text-bold text-2xl mr-2">
							Continue
						</Text>
						<FontAwesome
							name="long-arrow-alt-right"
							size={40}
							color="#00aeef"
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<Footer />
			</View>
			<StatusBar backgroundColor="#000" style="light" />
		</SafeAreaView>
	);
};
export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "space-between",
	},
	greeting: {
		borderBottomColor: "#00aeef",
		borderWidth: 1,
	},
});
