import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

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

// Register User
export const createUser = async (email, password, name) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		if (!newAccount) {
			throw Error;
		} else {
			// creates an avatar out of user initials
			const avatarUrl = avatars.getInitials(name);
			// await signIn(email, password);
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
		console.log(error);
		// throw new Error(error);
	}
};
