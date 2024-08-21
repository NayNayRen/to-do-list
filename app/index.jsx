import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { router } from "expo-router";

const Index = () => {
	return (
		<SafeAreaView style={styles.container} className="px-5 pt-5">
			<View className="w-full">
				<Header />
			</View>
			<View className="w-full">
				<Text
					style={styles.greeting}
					className="text-2xl text-white text-center pb-2"
				>
					What would <Text className="italic">YOU</Text> like To Do?
				</Text>
				<View className="flex flex-row items-center justify-center mt-2">
					<FontAwesome
						name="long-arrow-alt-right"
						size={34}
						color="#00aeef"
						onPress={() => router.push("/home")}
					/>
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
