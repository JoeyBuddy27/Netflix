import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../axios.js";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Grid from "@material-ui/core/Grid";

const baseUrl = "http://image.tmdb.org/t/p/original/";

const Row = (props) => {
	const [movies, setMovies] = useState([]);
	const [listMovies, setListMovies] = useState([]);
	const { fetchUrl, isLargeRow } = props;
	const [trailerUrl, setTrailerUrl] = useState("");
	const [movieInfo, setMovieInfo] = useState("");
	const [movieTitle, setMovieTitle] = useState("");
	const [show, setShow] = useState(false);
	const [releaseDate, setReleaseDate] = useState("");
	const [rating, setRating] = useState("");
	const [added, setAdded] = useState("+ My List");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			setListMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]); //run once when the Row loads, and don't run again. Can put a dependecy instead.

	const opts = {
		height: "350",
		width: "95%",
		playerVars: {
			autoplay: 0,
		},
	};

	const clickHandler = (movie) => {
		setMovieInfo(movie.overview);
		setMovieTitle(movie?.title || movie?.name || movie?.original_name);
		setRating(movie?.vote_average);
		setReleaseDate(movie?.release_date || movie?.first_air_date);
		setShow(!show);
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

	const closeHandler = () => {
		setShow(!show);
		setTrailerUrl("");
	};

	const scrollTo = (ref) => {
		if (ref /* + other conditions */) {
			ref.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const addListHandler = (movie) => {
		if (added === "Added!") {
			setAdded("+ My List");
		} else {
			setAdded("Added!");
		}
	};

	return (
		<div className="row">
			{show && (
				<React.Fragment>
					<Grid
						container
						xs={12}
						className="movieClick"
						ref={scrollTo}
					>
						<Grid item xs={12} md={6} className="youTube">
							{trailerUrl && (
								<YouTube
									videoId={trailerUrl}
									opts={opts}
									key={Math.random()}
								/>
							)}
						</Grid>
						<Grid item xs={12} md={6} className="movieInfo">
							<button
								className="closeButton"
								onClick={closeHandler}
							>
								Close{" "}
							</button>
							<button
								className="closeButton"
								onClick={() => addListHandler()}
							>
								{!added ? "+ My List" : "Added"}
							</button>
							<h1 className="rowTitle">{movieTitle}</h1>
							<p>
								Released: <b>{releaseDate}</b>
							</p>{" "}
							<br />
							{rating !== 0 ? (
								<button className="rating">{rating}</button>
							) : null}
							<p> {movieInfo} </p>
						</Grid>
					</Grid>
				</React.Fragment>
			)}

			<h2 className="rowTitle">{props.title}</h2>
			<div className="rowPosters">
				{movies.map((movie) =>
					movie.backdrop_path !== null ? (
						<React.Fragment>
							<img
								className={
									isLargeRow ? "largeRowPoster" : "rowPoster"
								}
								key={movie.id}
								src={`${baseUrl}${
									isLargeRow
										? movie.poster_path
										: movie.backdrop_path
								}`}
								alt={movie.name}
								onClick={() => clickHandler(movie)}
							/>
							}
						</React.Fragment>
					) : null
				)}
				<button
					className="closeButton"
					onClick={(movie) => addListHandler(movie)}
				>
					{added}
				</button>
			</div>
		</div>
	);
};

export default Row;
