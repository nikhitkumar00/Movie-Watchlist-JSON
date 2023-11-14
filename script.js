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
			.then((response) => response.json())
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
		box.title = element.Title + " - " + element.Year + " - " + element.Type;
		// box.onclick = () => {
		// 	var link = `https://www.imdb.com/title/${box.id}/`;
		// 	window.open(link, "_blank");
		// };

		var imageContainer = document.createElement("div");
		imageContainer.className = "image-container";
		box.appendChild(imageContainer);

		var image = document.createElement("img");
		image.className = "image";
		image.src = element.Poster;
		image.alt = element.Title;
		image.loading = "lazy";

		var watchlist = document.createElement("div");
		watchlist.className = "watchlist";
		if (value === true) {
			watchlist.innerHTML = "Remove";
			watchlist.classList.add("redd")
			watchlist.onclick = () => {
				removeFromWatchlist(element.imdbID);
			};
		} else {
			watchlist.innerHTML = "Watchlist";
			watchlist.classList.add("greenn")
			watchlist.onclick = () => {
				addToWatchlist(element.imdbID);
			};
		}
		box.appendChild(watchlist);
		imageContainer.appendChild(image);
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
				.then((response) => response.json())
				.then((data) => {
					listOfWatched.push(data);
					createboxes(listOfWatched, true);
				});
		});
	}
}
showwatchlist();
