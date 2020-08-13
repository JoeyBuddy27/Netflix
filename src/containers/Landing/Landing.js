import React, { useContext, useState } from "react";
import "./Landing.css";
import LoginIcon from "../../components/LoginIcon/LoginIcon";
import Grid from "@material-ui/core/Grid";
import netflixIcon from "../../assets/netflixIcon2.png";
import netflixIcon2 from "../../assets/netflixIcon3.png";
import netflixIcon3 from "../../assets/netflixIcon4.png";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";

const Landing = (props) => {
	const browseLink = "/Browse";

	return (
		<body className="Landing">
			<Nav />
			<h1 className="whosWatching"> Who's Watching? </h1>
			<Grid container spacing={3} className="iconSection">
				<LoginIcon
					name="Joe"
					browseLink={browseLink}
					icon={netflixIcon2}
				/>

				<LoginIcon name="Bob" browseLink="/Browse" icon={netflixIcon} />
				<LoginIcon
					name="Clare"
					browseLink={browseLink}
					icon={netflixIcon3}
				/>
			</Grid>
		</body>
	);
};

export default Landing;
