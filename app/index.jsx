import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";

const Index = () => {
	// checking for logged in user, skips landing page if so
	const { isLoading, isLoggedIn } = useGlobalContext();
	if (!isLoading && isLoggedIn) {
		// auto redirects to your home page
		return <Redirect href="/home" />;
	}

	return (
		<SafeAreaView className="bg-black h-full">
			<ScrollView contentContainerStyle={{ minHeight: "100%" }}>
				<View
					style={styles.container}
					className="px-3 py-5 w-full min-h-[100vh]"
				>
					<View className="w-full">
						<Header title="Something To Do..." />
					</View>
					<View className="w-full">
						<Text
							style={styles.greeting}
							className="text-2xl text-white text-center pb-2"
						>
							What would <Text className="italic">YOU</Text> like To Do?
						</Text>
						<Text className="text-white text-center text-lg pt-2">
							An application built to provide a way of keeping track of things
							to do, lists needed, or popup ideas.
						</Text>
						<View className="mt-4 flex flex-col items-center justify-center">
							<TouchableOpacity
								className="flex flex-row items-center justify-center my-4"
								onPress={() => router.push("/sign-in")}
							>
								<Text className="text-[#00aeef] text-bold text-2xl mr-2">
									Sign In
								</Text>
							</TouchableOpacity>
							<Text className="text-white">or...</Text>
							<TouchableOpacity
								className="flex flex-row items-center justify-center mt-4"
								onPress={() => router.push("/sign-up")}
							>
								<Text className="text-[#00aeef] text-bold text-2xl mr-2">
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<Footer />
					</View>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#000" style="light" />
		</SafeAreaView>
	);
};
export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	greeting: {
		borderBottomColor: "#00aeef",
		borderBottomWidth: 1,
	},
});
