const API_KEY = "56e0edc183ae67f02f93091dbc35bab8";

const requests = [
	{
		titleOriginals: "Netflix Originals",
		urlOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
	},
	{
		title: "Trending",
		url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	},
	{
		title: "Top Rated",
		url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	},
	{
		title: "Action Movies",
		url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	},
	{
		title: "Comedy Movies",
		url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	},
	{
		title: "Horror Movies",
		url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	},
	{
		title: "Romance Movies",
		url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	},
	{
		title: "Documentaries",
		url: `\discover/movie?api_key=${API_KEY}&with_genres=99`,
	},
];

export default requests;
