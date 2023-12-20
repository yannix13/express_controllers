
const database = require("../../database")

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  //res.json(movies);

  database
    .query("select * from movies ")
    .then(([result])=> {
      console.log(result)

      if(result != null){
        //console.log("exist");
        res.status(200).json(result);
      }else{
       // console.log("doesn't exist");
        res.status(404).send("doesn't exist")
      }
      
    })


    

};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  //const movie = movies.find((movie) => movie.id === id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([result])=>{
      console.log(id);
      console.log(result[0]);
     
      if(result[0] != null){
        //console.log("exist");
        res.status(200).json(result[0]);
      }else{
       // console.log("doesn't exist");
        res.status(404).send("doesn't exist")
      }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });

};

module.exports = {
  getMovies,
  getMovieById,
};
