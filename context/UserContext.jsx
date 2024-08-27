import { ID, Client, Account } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "../lib/toast";
import { appwriteConfig } from "../db/appwrite";

// Init your React Native SDK
const client = new Client();
client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

// creates new account instance
const account = new Account(client);

const UserContext = createContext();
export function useUser() {
	return useContext(UserContext);
}

export function UserProvider(props) {
	const [user, setUser] = useState(null);

	async function login(email, password) {
		const loggedIn = await account.createEmailPasswordSession(email, password);
		setUser(loggedIn);
		toast("Welcome Back. You've been logged in.");
	}

	async function logout() {
		await account.deleteSession("current");
		setUser(null);
		toast("Logged Out.");
	}

	async function register(email, password) {
		await account.create(ID.unique(), email, password);
		await login(email, password);
		toast("Account Created");
	}

	async function init() {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
			toast("Welcome Back. You've Been Logged In.");
		} catch (error) {
			setUser(null);
		}
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<UserContext.Provider
			value={{ current: user, login, logout, register, toast }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
