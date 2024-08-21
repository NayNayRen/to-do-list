import { View, Text, Image } from "react-native";
import React from "react";

const Footer = () => {
	return (
		<>
			<Image
				source={require("../assets/images/logo.png")}
				className="w-[75px]"
				resizeMode="contain"
			/>
		</>
	);
};

export default Footer;
