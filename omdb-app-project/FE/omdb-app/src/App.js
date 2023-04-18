import "./App.css";
import Movies from "./components/Movies";
import SearchBox from "./components/SearchBox";
import React, { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("");

  async function getMovies() {
    const apiurl = `http://www.omdbapi.com/?s=${value}&apikey=51bad8dc`;
    const response = await fetch(apiurl);

    const jsonResponse = await response.json();

    if (jsonResponse.Search) {
      setMovies(jsonResponse.Search);
    }
  }

  function onChange(event) {
    setValue(event.target.value);
    getMovies();
  }
  /*
  Can also use. Just a lot more comfortable using onChange event handlers

  useEffect(()=>{
    getMovies();
  },[value]);
  */

  // setting the like/dislike to BE
  async function handleLike(movie) {
    const response = await fetch(
      `http://localhost:5001/api/movies/${movie.imdbID}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      }
    );
  }

  async function handleDislike(movie) {
    const response = await fetch(
      `http://localhost:5001/api/movies/${movie.imdbID}/dislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      }
    );
  }

  return (
    <div className="App">
      <SearchBox value={value} onChange={onChange} />
      <Movies
        movies={movies}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    </div>
  );
}

export default App;
