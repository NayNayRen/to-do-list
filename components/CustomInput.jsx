import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Text, TextInput, View } from "react-native";

// passed prop addToDo function from index.jsx
const CustomInput = ({ handleChangeText, placeholder, title }) => {
	const [showPassword, setshowPassword] = useState(false);
	return (
		<View>
			<Text className="text-white text-lg mb-3">{title}</Text>
			<TextInput
				title={title}
				placeholder={placeholder}
				className="bg-white p-2 text-lg"
				onChangeText={handleChangeText}
			/>
			{title === "Password" && (
				<TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
					<FontAwesome
						source={!showPassword ? icons.eye : icons.eyeHide}
						className="w-6 h-6"
						resizeMode="contain"
						name={!showPassword ? "eye" : "eye-slash"}
						size={34}
						color="#00aeef"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CustomInput;
// onChangeText is used for text inputs to capture what's being typed
