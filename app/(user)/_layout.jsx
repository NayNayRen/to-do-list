import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const TabIcon = ({ name, color, focused }) => {
	return (
		<View style={styles.iconContainer}>
			{/* <TouchableOpacity>
				<FontAwesome name={name} size={26} color={color} />
			</TouchableOpacity> */}
			<Image
				source={require("../../assets/favicon.png")}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text
				className={`${focused ? "font-bold" : "font-regular"} text-md`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const UserLayout = () => {
	return (
		<>
			{/* <Stack>
				<Stack.Screen name="home" options={{ headerShown: false }} />
			</Stack> */}
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#00aeef",
					tabBarInactiveTintColor: "#fff",
					tabBarStyle: {
						backgroundColor: "#000",
						height: 75,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon color={color} name="Home" focused={focused} />
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon color={color} name="Profile" focused={focused} />
						),
					}}
				/>
			</Tabs>
			<StatusBar backgroundColor="#000" style="light" />
		</>
	);
};

export default UserLayout;

const styles = StyleSheet.create({
	iconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
