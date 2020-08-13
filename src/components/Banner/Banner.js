import React, { useState, useEffect, useCallback } from "react";
import "./Banner.css";
import requests from "../../requests.js";
import axios from "../../axios.js";
import Fade from "@material-ui/core/Fade";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = (props) => {
	const [movie, setMovie] = useState([]);

	const [fadeIn, setFadeIn] = useState(false);
	const [randomNumber, setRandomNumber] = useState(0);
	const [trailerUrl, setTrailerUrl] = useState("");
	const [fadeNum, setFadeNum] = useState(2500);

	const opts = {
		height: "350",
		width: "95%",
		playerVars: {
			autoplay: 0,
		},
	};

	const playHandler = (movie) => {
		setFadeNum(120000);
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(
				movie?.title || movie?.name || movie?.original_name || ""
			)
				.then((url) => {
					//https://www.youtube.com/watch?v=3hVJhebV208&   NEED THE v=3hVJhebV208& part only
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v")); //gets value of v from search params
				})
				.catch((error) => console.log(error));
		}
	};

	const closeVideoHandler = (movie) => {
		setFadeNum(2500);
		setTrailerUrl("");
	};

	const reRender = useCallback(() => {
		console.log("rerender");
		setRandomNumber(randomNumber + 1);
		setFadeIn(true);
		setTimeout(function () {
			setFadeIn(false);
		}, fadeNum);
	}, [randomNumber]);

	useEffect(() => {
		console.log("useEffect");
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
		}, fadeNum + 1500);
	}, [randomNumber, fadeNum]);

	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

	return (
		<React.Fragment>
			{trailerUrl === "" ? (
				<Fade in={fadeIn} timeout={800}>
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
								{movie?.title ||
									movie?.name ||
									movie?.original_name}
							</h1>

							<div className="banner_buttons">
								<button
									className="bannerButton"
									onClick={() => playHandler(movie)}
								>
									Play{" "}
								</button>
								<button className="bannerButton">
									{" "}
									+ My List{" "}
								</button>
							</div>
							<p className="overview">
								{truncate(movie?.overview, 150)}
							</p>
						</div>
						<div className="bannerFadeBottom" />
					</header>
				</Fade>
			) : (
				<React.Fragment>
					<div className="youTube">
						<YouTube
							videoId={trailerUrl}
							opts={opts}
							key={Math.random()}
						/>
					</div>
					<button
						className="bannerButton"
						onClick={() => closeVideoHandler(movie)}
					>
						{" "}
						Go back{" "}
					</button>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Banner;
