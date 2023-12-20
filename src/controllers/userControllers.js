const database = require("../../database")

const getUsers = (req, res) => {

  database
    .query("select * from users ")
    .then(([result])=> {
      console.log(result)

      if(result != null){
        res.status(200).json(result);
      }else{
        res.status(404).send("doesn't exist")
      }
      
    })
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
