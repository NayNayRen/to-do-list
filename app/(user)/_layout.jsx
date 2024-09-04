import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, View, Text } from "react-native";

const TabIcon = ({ color, name, faName, focused }) => {
	return (
		<View style={styles.iconContainer}>
			<FontAwesome name={faName} size={26} color={color} />
			<Text
				className={`${focused ? "font-bold" : "font-regular"} text-md mt-1`}
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
				<Stack.Screen name="profile" options={{ headerShown: false }} />
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
							<TabIcon
								color={color}
								name="Home"
								faName="home"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								color={color}
								name="Profile"
								faName="user"
								focused={focused}
							/>
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
