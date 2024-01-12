require("dotenv").config();
//const app = require("./src/app");

const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./src/controllers/movieControllers");
const userControllers = require("./src/controllers/userControllers");

// Movies routes
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.post("/api/movies", movieControllers.postMovie);

app.put("/api/movies/:id", movieControllers.updateMovie)


// Users routes
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
