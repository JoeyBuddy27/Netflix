import React, { useEffect, useState } from "react";
import "./Nav.css";
import Logo from "../../netflixLogo.png";
import Avatar from "../../netflixIcon.png";

const Nav = (props) => {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 400) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener("scroll");
		};
	}, []);
	return (
		<div className={`nav ${show && "navBlack"}`}>
			<img className="navLogo" src={Logo} alt="Netflix Logo" />
			<img className="navAvatar" src={Avatar} alt="Netflix Avatar" />
		</div>
	);
};

export default Nav;
