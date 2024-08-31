import { View, Text, Image } from "react-native";
import React from "react";

const EmptyList = ({ title, subtitle }) => {
	return (
		<View className="justify-center items-center px-5 w-full">
			<Image
				source={require("../assets/images/logo.png")}
				className="w-[225px] h-auto my-10"
				resizeMode="contain"
			/>
			<Text className="text-lg text-gray-100">{title}</Text>
			<Text className="text-xl text-bold text-[#00aeef] mt-5">{subtitle}</Text>
		</View>
	);
};

export default EmptyList;
