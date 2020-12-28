const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movies;

const fetchMovies = async () => {
  movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}`
  ).then((res) => res.json());
  console.log(movies);
};

const moviesDisplay = async () => {
  await fetchMovies();

  result.innerHTML = movies.results
    .map(
      (movie) =>
        `
        <h2>${movie.original_title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
      `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInput.value;
  moviesDisplay();
});
