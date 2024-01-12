
const database = require("../../database")


const getMovies = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];
  
  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }
  if (req.query.year != null) {
    where.push({
      column: "year",
      value: req.query.year,
      operator: "=",
    });
  }

  database
      .query(
          where.reduce((sql, { column, operator }, index) => {
              return `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`;
          }, initialSql), 
          where.map(({ value }) => value))
      .then(([movies]) => {
        res.json(movies);
      })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([result])=>{
      console.log(id);
      console.log(result[0]);
     
      if(result[0] != null){
        res.status(200).json(result[0]);
      }else{
        res.status(404).send("doesn't exist")
      }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });

};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;

    database
      .query(
        "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
        [title, director, year, color, duration, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
} 

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie
};
