require("dotenv").config();
//const app = require("./src/app");

const express = require("express");

const app = express();

const movieControllers = require("./src/controllers/movieControllers");
const userControllers = require("./src/controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

module.exports = app;


const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.log(`Server is listening on ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
