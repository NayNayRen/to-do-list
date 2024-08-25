import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const UserLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="home" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#000" style="light" />
		</>
	);
};

export default UserLayout;
