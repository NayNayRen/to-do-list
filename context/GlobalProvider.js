import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../db/appwrite";
// basically gets session and persists through the app and all screens
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
// children are the app screens
const GlobalProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	// fires at app load to check for current user
	useEffect(() => {
		getCurrentUser()
			.then((response) => {
				if (response) {
					setIsLoggedIn(true);
					setUser(response);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	// dependency array above is left empty so it only calls on load
	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
// exported here, imported in main app _layout
export default GlobalProvider;
