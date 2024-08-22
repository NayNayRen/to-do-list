import { View, Text } from "react-native";
import React from "react";

const Header = ({ title }) => {
	return (
		<>
			<Text className="text-[#00aeef] text-2xl text-center">{title}</Text>
		</>
	);
};

export default Header;
