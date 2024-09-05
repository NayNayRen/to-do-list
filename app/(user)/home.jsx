import { getAllToDos, getCurrentUser } from "../../db/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, RefreshControl } from "react-native";
import EmptyList from "../../components/EmptyList";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import ToDoItem from "../../components/ToDoItem";
import ToDoListHeader from "../../components/ToDoListHeader";
import useAppwrite from "../../db/useAppwrite";

const Home = () => {
	const { data: allToDosData, refetch } = useAppwrite(getAllToDos);
	const { data: currentUserData } = useAppwrite(getCurrentUser);
	const [refreshing, setRefreshing] = useState(false);

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<SafeAreaView className="bg-black py-5 px-3 h-full">
			{/* display for added todos */}
			<FlatList
				data={allToDosData}
				renderItem={({ item }) => (
					<ToDoItem key={item.id} item={item} refetch={refetch} />
				)}
				ListHeaderComponent={() => (
					<ToDoListHeader refetch={refetch} user={currentUserData} />
				)}
				ListFooterComponent={() => (
					<View className="w-full items-center justify-center">
						<Footer />
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyList
						title="There doesn't seem to be anything here..."
						subtitle="Add your first To Do."
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
		// </TouchableWithoutFeedback>
	);
};

export default Home;
