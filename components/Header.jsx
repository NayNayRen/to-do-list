import { View, Text } from "react-native";
import React from "react";

const Header = ({ title }) => {
	return (
		<>
			<Text className="text-[#00aeef] text-3xl text-center font-bold">
				{title}
			</Text>
		</>
	);
};

export default Header;
