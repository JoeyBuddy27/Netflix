import React, { useEffect, useState } from "react";
import "./Nav.css";
import Logo from "../../netflixLogo.png";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
	const [show, handleShow] = useState(false);
	const [logout, setLogout] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 400) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener("scroll", handleShow);
		};
	}, []);
	return (
		<div className={`nav ${show && "navBlack"}`}>
			<img className="navLogo" src={Logo} alt="Netflix Logo" />
			{props.avatar ? (
				<figure>
					<img
						className="navAvatar"
						src={props.avatar}
						alt="Netflix Avatar"
					/>
					<figcaption
						onClick={props.history.goBack}
						onMouseOver={() => setLogout(true)}
						onMouseOut={() => setLogout(false)}
					>
						{logout !== true ? props.username : "Logout"}
					</figcaption>
				</figure>
			) : null}
		</div>
	);
};

export default withRouter(Nav);
