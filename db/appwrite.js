import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";
import { Alert } from "react-native";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jeditendencies.todolist",
	projectId: "66c774b50019fbe460cc",
	databaseId: "66c776990029034067a9",
	userCollectionId: "66c77705002a28f97253",
	todoCollectionId: "66c777c9003ae939f262",
};

// Init your React Native SDK
const client = new Client();
client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

// creates new account instance
const account = new Account(client);
// creates new avatar instance
const avatars = new Avatars(client);
// creates new db instance
const databases = new Databases(client);

// creates a new user
export const createUser = async (email, password, name) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		if (!newAccount) {
			throw Error;
		} else {
			// creates an avatar out of user initials
			const avatarUrl = avatars.getInitials(name);

			// gets config data from above, makes unique ID, creates new user object
			const newUser = await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.userCollectionId,
				ID.unique(),
				{
					accountId: newAccount.$id,
					email,
					name,
					avatar: avatarUrl,
				}
			);
			return newUser;
		}
	} catch (error) {
		// console.log(error);
		Alert.alert(
			"Invalid Email",
			"That email is already registered to another user."
		);
		return;
	}
};

// update user name and initials for avatar
export const updateUserName = async (name) => {
	try {
		const currentAccount = await account.get();
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		const updatedUser = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			currentUser.documents[0].$id,
			{
				name: name,
				avatar: avatars.getInitials(name),
			}
		);
		await account.updateName(name);
		return updatedUser;
	} catch (error) {
		throw new Error(error);
	}
};

// update user email
export const updateUserEmail = async (email) => {
	try {
		const currentAccount = await account.get();
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		const result = await account.listSessions();
		console.log(result);
		// const updatedEmail = await account.updateEmail(email, currentUser.password);
		// return updatedEmail;
	} catch (error) {
		throw new Error(error);
	}
};

// sign user in on successful registration
export const signIn = async (email, password) => {
	try {
		// create a user session, method is created by Appwrite
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

// signs out and kills session
export const signOut = async () => {
	try {
		const deadSession = await account.deleteSession("current");
		return deadSession;
	} catch (error) {
		throw new Error(error);
	}
};

// gets current user
export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) {
			throw Error;
		} else {
			const currentUser = await databases.listDocuments(
				appwriteConfig.databaseId,
				appwriteConfig.userCollectionId,
				[Query.equal("accountId", currentAccount.$id)]
			);
			if (!currentUser) {
				throw Error;
			} else {
				return currentUser.documents[0];
			}
		}
	} catch (error) {
		console.log(error.message);
		throw new Error(error);
	}
};

// creates a new todo and adds it to Appwrite db
export const createToDo = async (todoId, body) => {
	try {
		const currentUser = await getCurrentUser();
		const newToDo = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			ID.unique(),
			{
				todoId,
				body,
				user: currentUser.$id,
			}
		);
		console.log("To Do Created");
		return newToDo;
	} catch (error) {
		throw new Error(error);
		console.log(error.message);
	}
};

// update to do
export const updateToDo = async (id, updatedText) => {
	try {
		const toDo = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			[Query.equal("$id", id)]
		);
		const updatedToDo = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			toDo.documents[0].$id,
			{
				body: updatedText,
			}
		);
		// console.log(updatedToDo);
		return updatedToDo;
	} catch (error) {
		throw new Error(error);
	}
};

// delete to do
export const deleteToDo = async (id) => {
	try {
		const todo = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			[Query.equal("todoId", id)]
		);
		// console.log(todo.documents[0].$id);
		databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			todo.documents[0].$id
		);
	} catch (error) {
		throw new Error(error);
		console.log(error.message);
	}
};

// get current users to dos
export const getAllToDos = async () => {
	try {
		const currentUser = await getCurrentUser();
		const todos = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			[Query.equal("user", currentUser.$id), Query.orderDesc("$createdAt")]
		);
		// console.log(todos);
		return todos.documents;
	} catch (error) {
		throw new Error(error);
	}
};

// gets single todo via the edit button in each todo item
export const getSingleToDo = async (id) => {
	try {
		const currentUser = await getCurrentUser();
		const todo = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.todoCollectionId,
			[Query.equal("user", currentUser.$id), Query.equal("$id", id)]
		);
		// console.log(todo.documents[0]);
		return todo.documents[0];
	} catch (error) {
		throw new Error(error);
	}
};
