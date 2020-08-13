import React, { useState, useMemo } from "react";
import netflixIcon2 from "../assets/netflixIcon3.png";

export const AvatarContext = React.createContext();
export const UsernameContext = React.createContext();
export const ListContext = React.createContext();

const Store = (props) => {
	const [avatar, setAvatar] = useState(netflixIcon2);
	const [username, setUsername] = useState("Joe");
	const [myList, setMyList] = useState([]);

	const providerAvatar = useMemo(() => ({ avatar, setAvatar }), [
		avatar,
		setAvatar,
	]);
	const providerUsername = useMemo(() => ({ username, setUsername }), [
		username,
		setUsername,
	]);

	const providerList = useMemo(() => ({ myList, setMyList }), [
		myList,
		setMyList,
	]);

	return (
		<AvatarContext.Provider value={providerAvatar}>
			<UsernameContext.Provider value={providerUsername}>
				<ListContext.Provider value={providerList}>
					{props.children}
				</ListContext.Provider>
			</UsernameContext.Provider>
		</AvatarContext.Provider>
	);
};

export default Store;
