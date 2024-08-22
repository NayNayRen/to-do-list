import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="sign-up" options={{ headerShown: false }} />
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#000" style="light" />
		</>
	);
};

export default AuthLayout;
