import React from "react";
import "../App.css";

function Movies(props) {
  return (
    <div className="Movies">
      {props.movies.map((movie) => {
        function handleLike() {
          props.handleLike(movie);
        }
        function handleDislike() {
          props.handleDislike(movie);
        }

        return (
          <div>
            <div>
              <h4 className="title">
                {movie.Title}: Released in {movie.Year}
              </h4>
              <img src={movie.Poster} alt="movie" className="movie"></img>
              <button
                className="button"
                onClick={() => console.log("just checking")}
              >
                Dummy Button
              </button>
            </div>
            <div>
              <button className="button" onClick={handleLike}>
                Like
              </button>
              <button className="button" onClick={handleDislike}>
                Dislike
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Movies;
