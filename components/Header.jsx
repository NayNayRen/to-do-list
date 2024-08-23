import { View, Text } from "react-native";
import React from "react";

const Header = ({ title }) => {
	return (
		<View className="w-full">
			<Text className="text-[#00aeef] text-3xl text-center font-bold">
				{title}
			</Text>
		</View>
	);
};

export default Header;
