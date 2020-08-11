import React, { useState, useEffect } from "react";
import classes from "./Banner.css";
import requests from "../../requests.js";
import axios from "../../axios.js";
import Fade from "@material-ui/core/Fade";

const Banner = (props) => {
	const baseUrl = "http://image.tmdb.org/t/p/original/";
	const [movie, setMovie] = useState([]);

	const [time, setTime] = useState(Date.now());
	const [fadeIn, setFadeIn] = useState(false);
	const [randomNumber, setRandomNumber] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests[0].urlOriginals);
			setMovie(request.data.results[randomNumber]);
			if (randomNumber === request.data.results.length) {
				setRandomNumber(0);
			}
		}
		fetchData();
		setTimeout(function () {
			reRender();
		}, 4000);
	}, [randomNumber]);

	const reRender = () => {
		setRandomNumber(randomNumber + 1);
		setFadeIn(true);
		setTimeout(function () {
			setFadeIn(false);
		}, 2500);
		console.log("fade" + fadeIn);
	};

	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

	return (
		<Fade in={fadeIn} timeout={1000}>
			<header
				style={{
					backgroundSize: "cover",
					backgroundPosition: "center center",
					backgroundImage: `url(
			"http://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
			)`,
				}}
			>
				<div className="bannerContents">
					<h1 className="bannerTitle">
						{movie?.title || movie?.name || movie?.original_name}
					</h1>
					<div className="banner_buttons">
						<button className="bannerButton">Play </button>
						<button className="bannerButton"> My List </button>
					</div>
					<p className="overview">{truncate(movie?.overview, 150)}</p>
				</div>
				<div className="bannerFadeBottom" />
			</header>
		</Fade>
	);
};

export default Banner;
