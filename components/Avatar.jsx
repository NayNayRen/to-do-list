import { View, Image } from "react-native";
import React from "react";

const Avatar = ({ user }) => {
	return (
		<View className="rounded-full justify-center items-center w-full">
			<Image
				source={
					!user?.avatar
						? require("../assets/favicon.png")
						: { uri: user?.avatar }
				}
				className="w-[55px] h-[55px] rounded-full text-bold"
				resizeMode="contain"
			/>
		</View>
	);
};

export default Avatar;
