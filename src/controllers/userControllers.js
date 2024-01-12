const database = require("../../database")

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }


  database
      .query(
          where.reduce((sql, { column, operator }, index) => {
              return `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`;
          }, initialSql), 
          where.map(({ value }) => value))
      .then(([users]) => {
        //res.setHeader('Content-Type', 'application/json')
        res.json(users);
      })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from users where id = ?", [id])
  .then(([result])=>{
      console.log(id);
      console.log(result[0]);
     
      if(result[0] != null){
        //console.log("exist");
      //  res.setHeader('Content-Type', 'application/json')
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
  getUsers,
  getUserById,
};
