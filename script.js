function toggleTheme() {
	const root = document.documentElement;
	root.classList.toggle("dark");
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
		if (value === true) {
			watchlist.innerHTML = "Remove";
			watchlist.onclick = () => {
				removeFromWatchlist(element.imdbID);
			};
		} else {
			watchlist.innerHTML = "Watchlist";
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
			fetch(`https://www.omdbapi.com/?apikey=9027a6a0&i=${element}`)
				.then((respose) => respose.json())
				.then((data) => {
					listOfWatched.push(data);
					createboxes(listOfWatched, true);
				});
		});
	}
}
