import React, { useContext } from "react";
import "./LoginIcon.css";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { AvatarContext, UsernameContext } from "../../store/store.js";
import netflixIcon2 from "../../assets/netflixIcon3.png";

const Landing = (props) => {
	const { avatar, setAvatar } = useContext(AvatarContext);
	const { username, setUsername } = useContext(UsernameContext);

	const onClickedHandler = (props) => {
		setAvatar(props.icon);
		setUsername(props.name);
	};

	return (
		<React.Fragment>
			<Grid item xs={6} className="IconWrapper">
				<Link to={props.browseLink}>
					<img
						src={props.icon}
						alt="user avatar"
						className="loginIcon"
						onClick={() => onClickedHandler(props)}
					/>
					<br />
					<h2 className="username">{props.name}</h2>
				</Link>
			</Grid>
		</React.Fragment>
	);
};

export default Landing;
