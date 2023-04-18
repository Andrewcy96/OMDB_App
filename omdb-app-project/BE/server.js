const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movie_db",
  password: "",
  port: 5000,
});

pool.connect(() => {
  console.log("Connected");
});
//didnt implement anything yet for get/delete should be easy just create a new component to house likes list and display from db using get
app.get("/", (req, res) => {
  res.send("Hello, your server is running!");
});

app.get("/api/movies", async function (req, res) {
  console.log("inside get");
  const result = await pool.query("SELECT * FROM movies");
  res.json(result.rows);
});

app.delete("/api/movies/:id", async (req, res) => {
  console.log("inside delete");
  const { imdbID } = req.params;
  await pool.query("DELETE FROM movies WHERE id = $1", [imdbID]);
});

app.get("/api/movies/search/:title", async (req, res) => {
  console.log("inside get movie title");
  const { title } = req.params;
  const result = await pool.query("SELECT * FROM movies WHERE title LIKE $1", [
    `%${title}%`,
  ]);
  res.json(result.rows);
});
// only implemented post to add likes/dislikes into the database
app.post("/api/movies/:id/:reaction", async (req, res) => {
  console.log("inside post");
  const { id, reaction } = req.params;
  const movie = req.body;

  await pool.query(
    "INSERT INTO movies (id, title, year) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
    [movie.imdbID, movie.Title, movie.Year]
  );

  if (reaction === "like") {
    await pool.query("INSERT INTO likes (movie_id, title) VALUES ($1, $2)", [
      id,
      movie.Title,
    ]);
  } else if (reaction === "dislike") {
    await pool.query("INSERT INTO dislikes (movie_id, title) VALUES ($1, $2)", [
      id,
      movie.Title,
    ]);
  }
});

app.listen(5001);
