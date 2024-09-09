import { getAllToDos } from "../../db/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, RefreshControl } from "react-native";
import EmptyList from "../../components/EmptyList";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import ToDoItem from "../../components/ToDoItem";
import ToDoListHeader from "../../components/ToDoListHeader";
import useAppwrite from "../../db/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { StyleSheet } from "react-native";

const Home = () => {
	const { user } = useGlobalContext();
	const { data: allToDosData, refetch } = useAppwrite(getAllToDos);
	const [refreshing, setRefreshing] = useState(false);

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<View style={styles.container} className="px-3 py-5 w-full min-h-[90vh]">
				{/* display for added todos */}
				<FlatList
					data={allToDosData}
					renderItem={({ item }) => (
						<ToDoItem key={item.id} item={item} refetch={refetch} />
					)}
					ListHeaderComponent={() => (
						<ToDoListHeader refetch={refetch} user={user} />
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
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
});
