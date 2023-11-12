function handleSearch(event) {
	if (event.key === "Enter") {
		// var input = document.getElementById("searchbox").value;
		// var query = `https://www.omdbapi.com/?apikey=9027a6a0&s=${input}`;
		// fetch(query)
		// 	.then((respose) => respose.json())
		// 	.then((data) => {
		createboxes([
			{
				Title: "Lauf um Dein Leben - Vom Junkie zum Ironman",
				Year: "2008",
				imdbID: "tt0954542",
				Type: "movie",
				Poster: "https://m.media-amazon.com/images/M/MV5BMDJhZjA5MWEtOTE5Yy00MWJiLTgwNjQtMDliOWI0NWJmZDZkXkEyXkFqcGdeQXVyMjY1ODY2Ng@@._V1_SX300.jpg",
			},
			{
				Title: "Ivan Ironman Stewart's Super Off Road",
				Year: "1989",
				imdbID: "tt0162408",
				Type: "game",
				Poster: "https://m.media-amazon.com/images/M/MV5BZDMwMWUyNDAtZmM3Ny00ZGM2LTg5MTItYmZiNzM1NzAyNGJmXkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg",
			},
			{
				Title: "Darasingh: Ironman",
				Year: "1964",
				imdbID: "tt0231426",
				Type: "movie",
				Poster: "https://m.media-amazon.com/images/M/MV5BZTVkMmE1OWYtMDdhZC00Mjg2LWEzNzktMWZiMjAxMmU0YTM0XkEyXkFqcGdeQXVyODQwMDcwNDY@._V1_SX300.jpg",
			},
			{
				Title: "Wild Man to Ironman",
				Year: "2018",
				imdbID: "tt9823994",
				Type: "movie",
				Poster: "N/A",
			},
			{
				Title: "Ironman Triathlon World Championship",
				Year: "2002",
				imdbID: "tt10239424",
				Type: "movie",
				Poster: "https://m.media-amazon.com/images/M/MV5BMzcxZTIzNjUtZWEwYi00NWU0LTg2MzctZTBmZjNjNmZiNzZlXkEyXkFqcGdeQXVyMjcxMjE1OTM@._V1_SX300.jpg",
			},
			{
				Title: "Kenshi Ironman: The Lost Brother",
				Year: "2018",
				imdbID: "tt11459748",
				Type: "movie",
				Poster: "N/A",
			},
			{
				Title: "Kenshi Ironman: The Inner Circle",
				Year: "2018",
				imdbID: "tt11459756",
				Type: "movie",
				Poster: "N/A",
			},
			{
				Title: "Kenshi Ironman: The Wrath of God",
				Year: "2018",
				imdbID: "tt11459780",
				Type: "movie",
				Poster: "N/A",
			},
			{
				Title: "Kenshi Ironman: The Thunderdome",
				Year: "2018",
				imdbID: "tt11459796",
				Type: "movie",
				Poster: "N/A",
			},
			{
				Title: "Kenshi Ironman: The Shinobi Job",
				Year: "2018",
				imdbID: "tt11459812",
				Type: "movie",
				Poster: "N/A",
			},
		]);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }
	}
}

function createboxes(data) {
	var container = document.getElementById("container");

	data.forEach((element) => {
		var box = document.createElement("div");
		box.className = "box";

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
		title.innerHTML = "<strong>Title: </strong>" + element.Title;

		var year = document.createElement("div");
		year.className = "year";
		year.innerHTML = "<strong>Year: </strong>" + element.Year;

		var imdb = document.createElement("div");
		imdb.className = "imdb";
		imdb.innerHTML = "<strong>IMDB ID: </strong>" + element.imdbID.slice(2);

		var type = document.createElement("div");
		type.className = "type";
		type.innerHTML = "<strong>Type: </strong>" + element.Type;

		var watchlist = document.createElement("div");
		watchlist.className = "watchlist";
		watchlist.innerHTML = "Watchlist";

		var watched = document.createElement("div");
		watched.className = "watched";
		watched.innerHTML = "Watched";

		details.appendChild(title);
		details.appendChild(year);
		details.appendChild(imdb);
		details.appendChild(type);
		details.appendChild(watchlist);
		details.appendChild(watched);

		imageContainer.appendChild(image);
		box.appendChild(details);

		container.appendChild(box);
	});
}
