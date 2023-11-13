const root = document.documentElement;
if (localStorage.getItem("theme") === "dark") {
	toggleTheme();
}

function toggleTheme() {
	const root = document.documentElement;
	root.classList.toggle("dark");
	localStorage.setItem(
		"theme",
		root.classList.contains("dark") ? "dark" : "light"
	);
	document.getElementById("iconimg").classList.toggle("filter");
}

function handleSearch(event) {
	if (event.key === "Enter") {
		var input = document.getElementById("searchbox").value;
		var query = `https://www.omdbapi.com/?apikey=9027a6a0&s=${input}`;
		fetch(query)
			.then((respose) => respose.json())
			.then((data) => {
				createboxes(data.Search, "search");
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

function createboxes(data, value) {
	var container = document.getElementById("container");

	container.innerHTML = "";
	data.forEach((element) => {
		var box = document.createElement("div");
		box.className = "box";
		box.id = element.imdbID;
		box.title = "Open in IMDB: " + element.Title;
		box.onclick = () => {
			var link = `https://www.imdb.com/title/${box.id}/`;
			window.open(link, "_blank");
		};

		var imageContainer = document.createElement("div");
		imageContainer.className = "image-container";
		box.appendChild(imageContainer);

		var image = document.createElement("img");
		image.className = "image";
		image.src = element.Poster;

		var details = document.createElement("div");
		details.className = "details";

		var title = document.createElement("div");
		title.className = "title";
		title.innerHTML = "<strong>" + element.Title + "</strong>";

		var year = document.createElement("div");
		year.className = "year";
		year.innerHTML = "<i><strong>Year: </strong>" + element.Year + "</i>";

		var imdb = document.createElement("div");
		imdb.className = "imdb";
		imdb.innerHTML =
			"<i><strong>IMDB ID: </strong>" + element.imdbID.slice(2) + "</i>";

		var type = document.createElement("div");
		type.className = "type";
		type.innerHTML = "<i><strong>Type: </strong>" + element.Type + "</i>";

		var watchlist = document.createElement("div");
		watchlist.className = "watchlist";
		if (value === true) {
			watchlist.innerHTML = "Remove";
			watchlist.classList.add("redd");
			watchlist.onclick = () => {
				removeFromWatchlist(element.imdbID);
			};
		} else {
			watchlist.innerHTML = "Watchlist";
			watchlist.classList.add("greenn");
			watchlist.onclick = () => {
				addToWatchlist(element.imdbID);
			};
		}

		details.appendChild(title);
		details.appendChild(year);
		details.appendChild(imdb);
		details.appendChild(type);
		details.appendChild(watchlist);

		imageContainer.appendChild(image);
		box.appendChild(details);

		container.appendChild(box);
	});
}

function addToWatchlist(id) {
	var list = JSON.parse(localStorage.getItem("watchlist")) || [];
	if (list.includes(id)) {
		alert("Movie already in watchlist");
	} else {
		list.push(id);
		alert("Movie added to watchlist");
	}
	localStorage.setItem("watchlist", JSON.stringify(list));
}

function removeFromWatchlist(id) {
	var list = JSON.parse(localStorage.getItem("watchlist")) || [];
	if (!list.includes(id)) {
		alert("Movie not in watchlist");
	} else {
		var index = list.indexOf(id);
		list.splice(index, 1);
		alert("Movie removed from watchlist");
	}
	localStorage.setItem("watchlist", JSON.stringify(list));
	showwatchlist();
}

function showwatchlist() {
	var list = JSON.parse(localStorage.getItem("watchlist")) || [];
	if (list.length == 0) {
		var container = document.getElementById("container");
		container.innerHTML = "You have No Movies in your Watchlist";
		alert("No movies in watchlist");
	} else {
		var listOfWatched = [];
		list.forEach((element) => {
			var box = document.createElement("div");
			box.className = "box";
			box.id = element;
			// fetch(`https://www.omdbapi.com/?apikey=9027a6a0&i=${element}`)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		listOfWatched.push(data);
			createboxes(
				[
					{
						Title: "Spider-Man: Homecoming",
						Year: "2017",
						Rated: "PG-13",
						Released: "07 Jul 2017",
						Runtime: "133 min",
						Genre: "Action, Adventure, Sci-Fi",
						Director: "Jon Watts",
						Writer: "Jonathan Goldstein, John Francis Daley, Jon Watts",
						Actors: "Tom Holland, Michael Keaton, Robert Downey Jr.",
						Plot: "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
						Language: "English, Spanish",
						Country: "United States",
						Awards: "7 wins & 10 nominations",
						Poster: "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "7.4/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "92%",
							},
							{
								Source: "Metacritic",
								Value: "73/100",
							},
						],
						Metascore: "73",
						imdbRating: "7.4",
						imdbVotes: "699,948",
						imdbID: "tt2250912",
						Type: "movie",
						DVD: "10 Jul 2017",
						BoxOffice: "$334,201,140",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "The Amazing Spider-Man",
						Year: "2012",
						Rated: "PG-13",
						Released: "03 Jul 2012",
						Runtime: "136 min",
						Genre: "Action, Adventure, Sci-Fi",
						Director: "Marc Webb",
						Writer: "James Vanderbilt, Alvin Sargent, Steve Kloves",
						Actors: "Andrew Garfield, Emma Stone, Rhys Ifans",
						Plot: "After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe.",
						Language: "English",
						Country: "United States",
						Awards: "2 wins & 31 nominations",
						Poster: "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "6.9/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "71%",
							},
							{
								Source: "Metacritic",
								Value: "66/100",
							},
						],
						Metascore: "66",
						imdbRating: "6.9",
						imdbVotes: "687,251",
						imdbID: "tt0948470",
						Type: "movie",
						DVD: "01 Sep 2014",
						BoxOffice: "$262,030,663",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Spider-Man: No Way Home",
						Year: "2021",
						Rated: "PG-13",
						Released: "17 Dec 2021",
						Runtime: "148 min",
						Genre: "Action, Adventure, Fantasy",
						Director: "Jon Watts",
						Writer: "Chris McKenna, Erik Sommers, Stan Lee",
						Actors: "Tom Holland, Zendaya, Benedict Cumberbatch",
						Plot: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
						Language: "English",
						Country: "United States",
						Awards: "Nominated for 1 Oscar. 35 wins & 71 nominations total",
						Poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "8.2/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "93%",
							},
							{
								Source: "Metacritic",
								Value: "71/100",
							},
						],
						Metascore: "71",
						imdbRating: "8.2",
						imdbVotes: "840,950",
						imdbID: "tt10872600",
						Type: "movie",
						DVD: "15 Mar 2022",
						BoxOffice: "$814,115,070",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Spider-Man: Into the Spider-Verse",
						Year: "2018",
						Rated: "PG",
						Released: "14 Dec 2018",
						Runtime: "117 min",
						Genre: "Animation, Action, Adventure",
						Director:
							"Bob Persichetti, Peter Ramsey, Rodney Rothman",
						Writer: "Phil Lord, Rodney Rothman",
						Actors: "Shameik Moore, Jake Johnson, Hailee Steinfeld",
						Plot: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
						Language: "English, Spanish",
						Country: "Canada, United States",
						Awards: "Won 1 Oscar. 81 wins & 57 nominations total",
						Poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "8.4/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "97%",
							},
							{
								Source: "Metacritic",
								Value: "87/100",
							},
						],
						Metascore: "87",
						imdbRating: "8.4",
						imdbVotes: "634,267",
						imdbID: "tt4633694",
						Type: "movie",
						DVD: "07 Mar 2019",
						BoxOffice: "$190,241,310",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Spider-Man 2",
						Year: "2004",
						Rated: "PG-13",
						Released: "30 Jun 2004",
						Runtime: "127 min",
						Genre: "Action, Adventure, Sci-Fi",
						Director: "Sam Raimi",
						Writer: "Stan Lee, Steve Ditko, Alfred Gough",
						Actors: "Tobey Maguire, Kirsten Dunst, Alfred Molina",
						Plot: "Peter Parker is beset with troubles in his failing personal life as he battles a brilliant scientist named Doctor Otto Octavius.",
						Language: "English, Russian, Chinese",
						Country: "United States",
						Awards: "Won 1 Oscar. 25 wins & 60 nominations total",
						Poster: "https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "7.5/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "93%",
							},
							{
								Source: "Metacritic",
								Value: "83/100",
							},
						],
						Metascore: "83",
						imdbRating: "7.5",
						imdbVotes: "689,959",
						imdbID: "tt0316654",
						Type: "movie",
						DVD: "08 May 2015",
						BoxOffice: "$373,585,825",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Spider-Man: Across the Spider-Verse",
						Year: "2023",
						Rated: "PG",
						Released: "02 Jun 2023",
						Runtime: "140 min",
						Genre: "Animation, Action, Adventure",
						Director:
							"Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
						Writer: "Phil Lord, Christopher Miller, Dave Callaham",
						Actors: "Shameik Moore, Hailee Steinfeld, Brian Tyree Henry",
						Plot: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a ...",
						Language: "English",
						Country: "United States",
						Awards: "5 wins & 3 nominations",
						Poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "8.7/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "96%",
							},
							{
								Source: "Metacritic",
								Value: "86/100",
							},
						],
						Metascore: "86",
						imdbRating: "8.7",
						imdbVotes: "290,497",
						imdbID: "tt9362722",
						Type: "movie",
						DVD: "08 Aug 2023",
						BoxOffice: "$381,311,319",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Spider-Man 3",
						Year: "2007",
						Rated: "PG-13",
						Released: "04 May 2007",
						Runtime: "139 min",
						Genre: "Action, Adventure, Sci-Fi",
						Director: "Sam Raimi",
						Writer: "Sam Raimi, Ivan Raimi, Alvin Sargent",
						Actors: "Tobey Maguire, Kirsten Dunst, Topher Grace",
						Plot: "A strange black entity from another world bonds with Peter Parker and causes inner turmoil as he contends with new villains, temptations, and revenge.",
						Language: "English, French",
						Country: "United States",
						Awards: "Nominated for 1 BAFTA Award4 wins & 44 nominations total",
						Poster: "https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "6.3/10",
							},
							{
								Source: "Rotten Tomatoes",
								Value: "63%",
							},
							{
								Source: "Metacritic",
								Value: "59/100",
							},
						],
						Metascore: "59",
						imdbRating: "6.3",
						imdbVotes: "622,603",
						imdbID: "tt0413300",
						Type: "movie",
						DVD: "16 Apr 2012",
						BoxOffice: "$336,530,303",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
					{
						Title: "Totally Killer",
						Year: "2023",
						Rated: "R",
						Released: "06 Oct 2023",
						Runtime: "106 min",
						Genre: "Comedy, Horror",
						Director: "Nahnatchka Khan",
						Writer: "David Matalon, Sasha Perl-Raver, Jen D'Angelo",
						Actors: "Kiernan Shipka, Olivia Holt, Charlie Gillespie",
						Plot: 'When the infamous "Sweet Sixteen Killer" returns 35 years after his first murder spree to claim another victim, 17-year-old Jamie accidentally travels back in time to 1987, determined to stop the killer before he can start.',
						Language: "English",
						Country: "United States",
						Awards: "N/A",
						Poster: "https://m.media-amazon.com/images/M/MV5BYzQwYzY4YWUtNDMxMS00Y2UxLTlhODQtY2ExZDY5ZDhhZGMzXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
						Ratings: [
							{
								Source: "Internet Movie Database",
								Value: "6.6/10",
							},
						],
						Metascore: "N/A",
						imdbRating: "6.6",
						imdbVotes: "21,161",
						imdbID: "tt11426232",
						Type: "movie",
						DVD: "N/A",
						BoxOffice: "N/A",
						Production: "N/A",
						Website: "N/A",
						Response: "True",
					},
				],
				true
			);
		});
	}
}
showwatchlist();
