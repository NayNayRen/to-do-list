import { getAllToDos } from "../../db/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { View, FlatList, RefreshControl } from "react-native";
import EmptyList from "../../components/EmptyList";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import ToDoItem from "../../components/ToDoItem";
import ToDoListHeader from "../../components/ToDoListHeader";
import useAppwrite from "../../db/useAppwrite";

const Home = () => {
	const { user } = useGlobalContext();
	const { data: allToDosData, refetch } = useAppwrite(getAllToDos);
	const [refreshing, setRefreshing] = useState(false);
	const [spinnerVisible, setSpinnerVisible] = useState(false);
	const [spinnerText, setSpinnerText] = useState("");

	// does the refresh reload action
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<Spinner
				visible={spinnerVisible}
				textContent={spinnerText}
				textStyle={styles.spinnerText}
				overlayColor="rgba(0, 0, 0, 0.8)"
			/>
			<View style={styles.container} className="px-3 py-5 w-full min-h-[90vh]">
				{/* display for added todos */}
				<View className="w-full">
					<FlatList
						data={allToDosData}
						// header
						ListHeaderComponent={() => (
							<ToDoListHeader
								refetch={refetch}
								user={user}
								spinnerVisible={spinnerVisible}
								setSpinnerVisible={setSpinnerVisible}
								spinnerText={spinnerText}
								setSpinnerText={setSpinnerText}
							/>
						)}
						// each todo
						renderItem={({ item }) => (
							<ToDoItem
								key={item.$id}
								refetch={refetch}
								itemId={item.$id}
								itemBody={item.body}
								itemCreated={item.$createdAt}
								itemUpdated={item.$updatedAt}
								itemDeleteId={item.todoId}
								spinnerVisible={spinnerVisible}
								setSpinnerVisible={setSpinnerVisible}
								spinnerText={spinnerText}
								setSpinnerText={setSpinnerText}
							/>
						)}
						// footer
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
	spinnerText: {
		color: "#fff",
	},
});
