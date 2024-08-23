import { Stack } from "expo-router";

const UserLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
		</Stack>
	);
};

export default UserLayout;
