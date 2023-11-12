function handleSearch(event) {
	if (event.key === "Enter") {
		var input = document.getElementById("searchbox").value;
		var query = `https://www.omdbapi.com/?apikey=9027a6a0&s=${input}`;
		fetch(query)
			.then((respose) => respose.json())
			.then((data) => {
				createboxes(data.Search);
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

function createboxes(data) {
	var container = document.getElementById("container");

	data.forEach((element) => {
		var box = document.createElement("div");
		box.className = "box";

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

		box.appendChild(image);
		box.appendChild(details);

		container.appendChild(box);
	});
}
